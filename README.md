# Mac Setup — Sabir

Mini-site (Vite + React) pour onboarder Sabir sur son nouveau Mac : apps a installer,
outils dev, reglages a faire, et le setup terminal zsh + Powerlevel10k facon Rayan.

- Checklist interactive (progression sauvegardee en local)
- Bouton copier sur chaque commande
- Script tout-en-un `install.sh` + `Brewfile` telechargeables
- Theme terminal dark

## Dev

```bash
npm install
npm run dev      # serveur local
npm run build    # build prod -> dist/
npm run preview  # apercu du build
```

## Contenu

- `src/data.ts` — toutes les sections / apps / commandes (edite ici pour ajouter/retirer)
- `public/install.sh` — installeur macOS tout-en-un (Homebrew + apps + zsh/p10k)
- `public/Brewfile` — liste brew (`brew bundle --file=Brewfile`)

## Le script tout-en-un

```bash
curl -fsSL https://sabir-guidemacos.vercel.app/install.sh | bash
```

Fait : Xcode CLT → Homebrew → apps (brew bundle) → Oh My Zsh + Powerlevel10k + plugins
+ `config_p10k` de [Rayandri/zsh](https://github.com/Rayandri/zsh) + init nvm/pyenv.
Idempotent. Aucun alias SSH n'est inclus.

## Deploiement

Heberge sur Vercel (preset Vite auto-detecte : build `npm run build`, output `dist/`).
