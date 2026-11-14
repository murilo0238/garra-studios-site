#!/usr/bin/env bash
# Volta o site para a versão publicada anteriormente (instantâneo, sem build).
# Uso: DEPLOY_HOST=root@SEU_IP DEPLOY_KEY=~/.ssh/sua_chave bash deploy/rollback.sh
set -euo pipefail

: "${DEPLOY_HOST:?Defina DEPLOY_HOST, por exemplo: DEPLOY_HOST=root@SEU_IP}"
SSH_OPTS=(-o BatchMode=yes -o ConnectTimeout=15)
if [ -n "${DEPLOY_KEY:-}" ]; then SSH_OPTS+=(-i "$DEPLOY_KEY"); fi

ssh "${SSH_OPTS[@]}" "$DEPLOY_HOST" bash -s <<'REMOTE'
set -euo pipefail
dir="/var/www/garrastudios"
current="$(basename "$(readlink "$dir/current")")"
# Escolhe a versão imediatamente mais antiga que a atual.
previous="$(ls -1 "$dir/releases" | sort -r | awk -v c="$current" 'found {print; exit} $0 == c {found=1}')"
if [ -z "$previous" ]; then
  echo "✗ Não há versão anterior a $current." >&2
  exit 1
fi
ln -sfn "releases/$previous" "$dir/current.tmp"
mv -Tf "$dir/current.tmp" "$dir/current"
echo "✓ Voltou de $current para $previous"
REMOTE
