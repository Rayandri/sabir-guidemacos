#!/bin/bash
# =============================================================
#  Setup Mac de Sabir — par Rayan
#  Usage :  curl -fsSL https://sabir-guidemacos.vercel.app/install.sh | bash
#  Idempotent : tu peux le relancer sans rien casser.
# =============================================================
set -e

bold() { printf "\033[1;32m%s\033[0m\n" "$1"; }
info() { printf "\033[0;36m→ %s\033[0m\n" "$1"; }
warn() { printf "\033[1;33m! %s\033[0m\n" "$1"; }

bold "🍎 Setup Mac de Sabir — c'est parti"

# -------------------------------------------------------------
# 1. Xcode Command Line Tools (compilateurs + git)
# -------------------------------------------------------------
if ! xcode-select -p >/dev/null 2>&1; then
  info "Installation des Xcode Command Line Tools..."
  xcode-select --install || true
  warn "Termine l'installation dans la fenetre qui s'ouvre, PUIS relance ce script."
  exit 0
fi

# -------------------------------------------------------------
# 2. Homebrew
# -------------------------------------------------------------
if ! command -v brew >/dev/null 2>&1; then
  info "Installation de Homebrew..."
  NONINTERACTIVE=1 /bin/bash -c \
    "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Charge brew dans le PATH (Apple Silicon)
if [ -x /opt/homebrew/bin/brew ]; then
  grep -qxF 'eval "$(/opt/homebrew/bin/brew shellenv)"' ~/.zprofile 2>/dev/null \
    || echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
  eval "$(/opt/homebrew/bin/brew shellenv)"
fi

# -------------------------------------------------------------
# 3. Apps & outils (via brew bundle)
# -------------------------------------------------------------
info "Installation des apps (ca peut prendre quelques minutes)..."
brew bundle --no-lock --file=- <<'BREWFILE'
cask "font-fira-code-nerd-font"
cask "iterm2"
brew "git"
brew "gh"
brew "nvm"
brew "pyenv"
brew "neovim"
brew "bat"
brew "tree"
brew "htop"
brew "wget"
brew "coreutils"
cask "visual-studio-code"
cask "cursor"
cask "claude"
cask "docker-desktop"
cask "rectangle"
cask "alt-tab"
cask "macs-fan-control"
cask "stats"
cask "appcleaner"
BREWFILE

# -------------------------------------------------------------
# 4. Oh My Zsh
# -------------------------------------------------------------
if [ ! -d "$HOME/.oh-my-zsh" ]; then
  info "Installation de Oh My Zsh..."
  RUNZSH=no CHSH=no sh -c \
    "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
fi

# -------------------------------------------------------------
# 5. Plugins zsh + theme Powerlevel10k
# -------------------------------------------------------------
ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
clone() { [ -d "$2" ] || git clone --depth=1 "$1" "$2"; }

info "Plugins zsh + Powerlevel10k..."
clone https://github.com/zsh-users/zsh-autosuggestions          "$ZSH_CUSTOM/plugins/zsh-autosuggestions"
clone https://github.com/zsh-users/zsh-syntax-highlighting.git   "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"
clone https://github.com/zsh-users/zsh-completions.git           "$ZSH_CUSTOM/plugins/zsh-completions"
clone https://github.com/zsh-users/zsh-history-substring-search.git "$ZSH_CUSTOM/plugins/zsh-history-substring-search"
clone https://github.com/zdharma-continuum/fast-syntax-highlighting.git "$ZSH_CUSTOM/plugins/fast-syntax-highlighting"
clone https://github.com/romkatv/powerlevel10k.git               "$ZSH_CUSTOM/themes/powerlevel10k"

# -------------------------------------------------------------
# 6. Configuration de ~/.zshrc (sed BSD = sed -i '')
# -------------------------------------------------------------
[ -f ~/.zshrc ] || touch ~/.zshrc
sed -i '' 's|^ZSH_THEME=.*|ZSH_THEME="powerlevel10k/powerlevel10k"|' ~/.zshrc 2>/dev/null || true
sed -i '' 's/^plugins=.*/plugins=(git zsh-autosuggestions zsh-syntax-highlighting fast-syntax-highlighting)/' ~/.zshrc 2>/dev/null || true

# -------------------------------------------------------------
# 7. Config Powerlevel10k de Rayan
# -------------------------------------------------------------
info "Recuperation du config_p10k de Rayan..."
curl -fsSL https://raw.githubusercontent.com/Rayandri/zsh/main/config_p10k -o ~/.p10k.zsh
grep -qxF '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' ~/.zshrc \
  || echo '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' >> ~/.zshrc

# -------------------------------------------------------------
# 8. nvm + pyenv dans ~/.zshrc
# -------------------------------------------------------------
mkdir -p ~/.nvm
if ! grep -q 'NVM_DIR' ~/.zshrc; then
  {
    echo ''
    echo '# nvm'
    echo 'export NVM_DIR="$HOME/.nvm"'
    echo '[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && . "/opt/homebrew/opt/nvm/nvm.sh"'
  } >> ~/.zshrc
fi
if ! grep -q 'PYENV_ROOT' ~/.zshrc; then
  {
    echo ''
    echo '# pyenv'
    echo 'export PYENV_ROOT="$HOME/.pyenv"'
    echo 'export PATH="$PYENV_ROOT/bin:$PATH"'
    echo 'eval "$(pyenv init -)"'
  } >> ~/.zshrc
fi

# -------------------------------------------------------------
bold "✅ Termine !"
echo ""
echo "Derniere etape manuelle :"
echo "  • Ouvre iTerm2 → Settings → Profiles → Text → Font → choisis \"FiraCode Nerd Font\""
echo "  • Amphetamine s'installe depuis le Mac App Store (pas via brew)"
echo ""
echo "Puis redemarre ton terminal. Enjoy 🚀  — Rayan"
