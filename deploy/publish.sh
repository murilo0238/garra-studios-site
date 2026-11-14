#!/usr/bin/env bash
# Publica o site: build na sua máquina → envia para a VPS → troca de versão atômica.
# Mantém as 5 versões mais recentes em /var/www/garrastudios/releases para rollback.
#
# Uso (Git Bash / Linux / macOS):
#   DEPLOY_HOST=root@SEU_IP DEPLOY_KEY=~/.ssh/sua_chave bash deploy/publish.sh
set -euo pipefail

cd "$(dirname "$0")/.."

: "${DEPLOY_HOST:?Defina DEPLOY_HOST, por exemplo: DEPLOY_HOST=root@SEU_IP}"
SSH_OPTS=(-o BatchMode=yes -o ConnectTimeout=15)
if [ -n "${DEPLOY_KEY:-}" ]; then SSH_OPTS+=(-i "$DEPLOY_KEY"); fi

REMOTE_DIR="/var/www/garrastudios"
RELEASE="$(date +%Y%m%d-%H%M%S)"

echo "→ Gerando o site (npm run build)"
npm run build

if ! grep -q "wa.me/" out/index.html; then
  echo "✗ O build não tem número de WhatsApp. Preencha NEXT_PUBLIC_WHATSAPP_NUMBER no .env.local." >&2
  exit 1
fi

PACKAGE="$(mktemp -t garrastudios-XXXXXX).tar.gz"
trap 'rm -f "$PACKAGE"' EXIT
tar -czf "$PACKAGE" -C out .

echo "→ Enviando a versão $RELEASE para $DEPLOY_HOST"
scp "${SSH_OPTS[@]}" -q "$PACKAGE" "$DEPLOY_HOST:/tmp/garrastudios-$RELEASE.tar.gz"

ssh "${SSH_OPTS[@]}" "$DEPLOY_HOST" bash -s -- "$REMOTE_DIR" "$RELEASE" <<'REMOTE'
set -euo pipefail
dir="$1"; release="$2"
mkdir -p "$dir/releases/$release"
tar -xzf "/tmp/garrastudios-$release.tar.gz" -C "$dir/releases/$release"
rm -f "/tmp/garrastudios-$release.tar.gz"
chmod -R a+rX "$dir/releases/$release"
ln -sfn "releases/$release" "$dir/current.tmp"
mv -Tf "$dir/current.tmp" "$dir/current"
cd "$dir/releases" && ls -1 | sort -r | tail -n +6 | xargs -r rm -rf
echo "✓ No ar: $release (versões guardadas: $(ls -1 | wc -l))"
REMOTE
