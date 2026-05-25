// Contenu du guide. Edite ici pour ajouter/retirer des apps ou des etapes.

export type Item = {
  id: string;
  title: string;
  desc: string;
  link?: string;
  linkLabel?: string;
  cmd?: string; // commande copiable (brew, etc.)
  note?: string; // astuce / detail en plus
};

export type SectionKind = "steps" | "apps" | "optional";

export type Section = {
  id: string;
  num: string;
  title: string;
  emoji: string;
  intro?: string;
  kind: SectionKind;
  items: Item[];
};

// URL de l'installeur tout-en-un (mise a jour apres deploiement Vercel).
export const INSTALL_URL = "https://sabir-guidemacos.vercel.app/install.sh";

export const SECTIONS: Section[] = [
  {
    id: "deballage",
    num: "00",
    title: "Au deballage",
    emoji: "📦",
    kind: "steps",
    intro:
      "Les 5 min de reglages a faire en arrivant. Rien a installer, juste a cliquer.",
    items: [
      {
        id: "appleid",
        title: "Connexion Apple ID / iCloud",
        desc:
          "Reglages > [ton nom] en haut. Connecte ton Apple ID pour iCloud, App Store, Trousseau (mots de passe) et Localiser.",
      },
      {
        id: "maj",
        title: "Mises a jour systeme",
        desc:
          "Reglages > General > Mise a jour de logiciels. Installe tout avant de bosser, ca evite des bugs random.",
      },
      {
        id: "clavier",
        title: "Clavier rapide (dev)",
        desc:
          "Reglages > Clavier : monte la vitesse de repetition au max et le delai au min. Desactive la correction auto / majuscule auto (penible pour coder).",
      },
      {
        id: "finder",
        title: "Finder utilisable",
        desc:
          "Dans Finder : affiche les extensions de fichiers et la barre de chemin (menu Presentation). Raccourci Cmd+Shift+. pour voir les fichiers caches.",
        note: "Reglages Finder > Avance > coche \"Afficher toutes les extensions\".",
      },
      {
        id: "trackpad",
        title: "Trackpad",
        desc:
          "Reglages > Trackpad : active \"Toucher pour cliquer\" et monte la vitesse du curseur. Confort immediat.",
      },
      {
        id: "filevault",
        title: "Securite : FileVault + pare-feu",
        desc:
          "Reglages > Confidentialite et securite : active FileVault (chiffrement du disque) et le pare-feu. Si le Mac est vole, tes donnees sont illisibles.",
      },
    ],
  },
  {
    id: "prerequis",
    num: "01",
    title: "Les prerequis (a faire en 1er)",
    emoji: "🧱",
    kind: "apps",
    intro:
      "Tout le reste depend de ces deux la. A lancer dans l'app Terminal (Cmd+Espace, tape \"Terminal\").",
    items: [
      {
        id: "xcode-clt",
        title: "Xcode Command Line Tools",
        desc:
          "Les compilateurs + git de base fournis par Apple. Beaucoup d'outils refusent de s'installer sans ca.",
        cmd: "xcode-select --install",
      },
      {
        id: "homebrew",
        title: "Homebrew",
        desc:
          "LE gestionnaire de paquets du Mac. C'est lui qui installe quasiment tout ce qui suit, en une commande.",
        link: "https://brew.sh",
        linkLabel: "brew.sh",
        cmd: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
        note:
          "Apres l'install, ajoute brew au PATH :  echo 'eval \"$(/opt/homebrew/bin/brew shellenv)\"' >> ~/.zprofile && eval \"$(/opt/homebrew/bin/brew shellenv)\"",
      },
    ],
  },
  {
    id: "terminal",
    num: "02",
    title: "Terminal & shell (le vibe Rayan)",
    emoji: "🖥️",
    kind: "apps",
    intro:
      "Le setup zsh + Powerlevel10k. Le plus simple : lance le script tout-en-un en haut de page, il fait tout ca automatiquement.",
    items: [
      {
        id: "iterm2",
        title: "iTerm2",
        desc:
          "Le terminal qu'on utilise (mieux que le Terminal d'Apple : split, recherche, themes).",
        link: "https://iterm2.com",
        linkLabel: "iterm2.com",
        cmd: "brew install --cask iterm2",
      },
      {
        id: "firacode",
        title: "FiraCode Nerd Font",
        desc:
          "La police avec les icones. OBLIGATOIRE pour Powerlevel10k, sinon le prompt affiche des carres.",
        link: "https://www.nerdfonts.com",
        linkLabel: "nerdfonts.com",
        cmd: "brew install --cask font-fira-code-nerd-font",
        note:
          "Ensuite dans iTerm2 > Settings > Profiles > Text > Font : choisis \"FiraCode Nerd Font\".",
      },
      {
        id: "zsh",
        title: "zsh + Oh My Zsh + Powerlevel10k",
        desc:
          "Le shell stylise de Rayan : oh-my-zsh, theme p10k, plugins (autosuggestions, syntax-highlighting). Le script tout-en-un l'installe pour toi.",
        link: "https://github.com/Rayandri/zsh",
        linkLabel: "github.com/Rayandri/zsh",
        note:
          "Au 1er lancement, p10k peut proposer un assistant de config : tu peux le passer, le config_p10k de Rayan est deja applique.",
      },
    ],
  },
  {
    id: "dev",
    num: "03",
    title: "Dev — les essentiels",
    emoji: "⚙️",
    kind: "apps",
    intro:
      "Les outils de dev qu'on utilise au quotidien. Chacun avec son lien si tu veux preferer l'install manuelle.",
    items: [
      {
        id: "vscode",
        title: "Visual Studio Code",
        desc: "L'editeur de code de reference. Extensions a gogo.",
        link: "https://code.visualstudio.com",
        linkLabel: "code.visualstudio.com",
        cmd: "brew install --cask visual-studio-code",
      },
      {
        id: "cursor",
        title: "Cursor",
        desc:
          "VS Code booste a l'IA (autocompletion + chat sur ta codebase). On l'utilise beaucoup.",
        link: "https://cursor.com",
        linkLabel: "cursor.com",
        cmd: "brew install --cask cursor",
      },
      {
        id: "claude-code",
        title: "Claude Code (CLI)",
        desc:
          "L'agent IA dans le terminal (celui qui a genere ce site). Tape \"claude\" dans n'importe quel projet.",
        link: "https://claude.com/claude-code",
        linkLabel: "claude.com/claude-code",
        cmd: "brew install --cask claude-code",
      },
      {
        id: "claude-app",
        title: "Claude (app desktop)",
        desc: "L'app de chat Claude pour le quotidien hors code.",
        link: "https://claude.ai/download",
        linkLabel: "claude.ai/download",
        cmd: "brew install --cask claude",
      },
      {
        id: "docker",
        title: "Docker Desktop",
        desc:
          "Pour faire tourner les conteneurs (bases de donnees, services, etc.) en local.",
        link: "https://www.docker.com/products/docker-desktop",
        linkLabel: "docker.com",
        cmd: "brew install --cask docker-desktop",
      },
      {
        id: "node",
        title: "Node.js (via nvm)",
        desc:
          "Runtime JavaScript. On passe par nvm pour jongler entre les versions de Node selon les projets.",
        link: "https://github.com/nvm-sh/nvm",
        linkLabel: "github.com/nvm-sh/nvm",
        cmd: "brew install nvm",
        note:
          "Apres : mkdir -p ~/.nvm puis ajoute dans ~/.zshrc :  export NVM_DIR=\"$HOME/.nvm\"  et  [ -s \"/opt/homebrew/opt/nvm/nvm.sh\" ] && . \"/opt/homebrew/opt/nvm/nvm.sh\"  — ensuite : nvm install --lts",
      },
      {
        id: "pyenv",
        title: "Python (via pyenv)",
        desc:
          "Pour gerer plusieurs versions de Python proprement (jamais le Python systeme).",
        link: "https://github.com/pyenv/pyenv",
        linkLabel: "github.com/pyenv/pyenv",
        cmd: "brew install pyenv",
      },
      {
        id: "gh",
        title: "Git + GitHub CLI (gh)",
        desc:
          "git est deja la (Xcode CLT). gh permet de se connecter a GitHub et cloner/creer des repos sans token galere.",
        link: "https://cli.github.com",
        linkLabel: "cli.github.com",
        cmd: "brew install gh && gh auth login",
      },
    ],
  },
  {
    id: "utils",
    num: "04",
    title: "Utilitaires Mac — confort",
    emoji: "🧰",
    kind: "apps",
    intro:
      "Les petits outils qui changent la vie sur Mac. A installer dans la foulee.",
    items: [
      {
        id: "rectangle",
        title: "Rectangle",
        desc:
          "Gestion des fenetres au clavier (snap moitie d'ecran, plein ecran...). Indispensable.",
        link: "https://rectangleapp.com",
        linkLabel: "rectangleapp.com",
        cmd: "brew install --cask rectangle",
      },
      {
        id: "alttab",
        title: "AltTab",
        desc:
          "Le Alt+Tab facon Windows : aperçu de toutes les fenetres pour switcher vite.",
        link: "https://alt-tab-macos.netlify.app",
        linkLabel: "alt-tab-macos.netlify.app",
        cmd: "brew install --cask alt-tab",
      },
      {
        id: "amphetamine",
        title: "Amphetamine",
        desc:
          "Empeche le Mac de se mettre en veille (utile pendant un build, un download, une demo). Gratuit, uniquement sur l'App Store.",
        link: "https://apps.apple.com/app/amphetamine/id937984704",
        linkLabel: "App Store",
        note: "Pas dispo via brew (app exclusivement App Store) : clique le lien et installe-la depuis le Mac App Store.",
      },
      {
        id: "macsfan",
        title: "Macs Fan Control",
        desc:
          "Controle des ventilos / monitoring des temperatures. Pratique quand ca chauffe sous gros build.",
        link: "https://crystalidea.com/macs-fan-control",
        linkLabel: "crystalidea.com",
        cmd: "brew install --cask macs-fan-control",
      },
      {
        id: "stats",
        title: "Stats",
        desc:
          "Moniteur systeme dans la barre de menu (CPU, RAM, reseau, batterie). Leger et propre.",
        link: "https://github.com/exelban/stats",
        linkLabel: "github.com/exelban/stats",
        cmd: "brew install --cask stats",
      },
      {
        id: "appcleaner",
        title: "AppCleaner",
        desc:
          "Desinstalle une app ET tous ses fichiers caches (sur Mac, glisser a la corbeille laisse des restes).",
        link: "https://freemacsoft.net/appcleaner",
        linkLabel: "freemacsoft.net",
        cmd: "brew install --cask appcleaner",
      },
      {
        id: "clipboard-spotlight",
        title: "Presse-papier : Spotlight natif (pas besoin de Maccy)",
        desc:
          "macOS 26 (Tahoe) a un historique de presse-papier directement dans Spotlight. Plus besoin d'une app dediee comme Maccy.",
        note:
          "Ouvre Spotlight (Cmd+Espace), va dans les modes de navigation et choisis l'historique du presse-papier (il garde tes copies recentes ~8h). Active-le une fois et c'est bon.",
      },
    ],
  },
  {
    id: "annexe",
    num: "05",
    title: "Plus tard / optionnel",
    emoji: "🗂️",
    kind: "optional",
    intro:
      "Pas urgent au demarrage. A garder sous le coude quand le besoin se presente.",
    items: [
      {
        id: "macmousefix",
        title: "Mac Mouse Fix",
        desc:
          "Seulement si tu veux binder les boutons d'une souris (gestes, raccourcis). Pas necessaire tout de suite.",
        link: "https://macmousefix.com",
        linkLabel: "macmousefix.com",
        cmd: "brew install --cask mac-mouse-fix",
      },
      {
        id: "hiddenbar",
        title: "Hidden Bar",
        desc:
          "Range les icones de la barre de menu. Sur ton 16 pouces tu as la place, donc pas utile au debut — pour plus tard si la barre se remplit.",
        link: "https://github.com/dwarvesf/hidden",
        linkLabel: "github.com/dwarvesf/hidden",
        cmd: "brew install --cask hiddenbar",
      },
    ],
  },
  {
    id: "reste",
    num: "06",
    title: "Le reste (rapide, tu trouveras)",
    emoji: "🚀",
    kind: "apps",
    intro:
      "Les apps grand public, rien a expliquer. Installe ce dont tu as besoin (ou via l'App Store directement).",
    items: [
      {
        id: "brave",
        title: "Brave",
        desc: "Navigateur (bloqueur de pub integre).",
        cmd: "brew install --cask brave-browser",
      },
      {
        id: "bitwarden",
        title: "Bitwarden",
        desc: "Gestionnaire de mots de passe.",
        cmd: "brew install --cask bitwarden",
      },
      {
        id: "vlc",
        title: "VLC",
        desc: "Lecteur video qui lit tout.",
        cmd: "brew install --cask vlc",
      },
      {
        id: "slack",
        title: "Slack",
        desc: "Messagerie equipe.",
        cmd: "brew install --cask slack",
      },
      {
        id: "discord",
        title: "Discord",
        desc: "Chat / vocal.",
        cmd: "brew install --cask discord",
      },
      {
        id: "telegram",
        title: "Telegram",
        desc: "Messagerie.",
        cmd: "brew install --cask telegram",
      },
      {
        id: "whatsapp",
        title: "WhatsApp",
        desc: "Messagerie.",
        cmd: "brew install --cask whatsapp",
      },
      {
        id: "ia",
        title: "ChatGPT / Gemini / Perplexity",
        desc: "Les autres apps IA, au choix.",
        cmd: "brew install --cask chatgpt",
      },
    ],
  },
];
