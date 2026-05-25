// Contenu du guide. Edite ici pour ajouter/retirer des apps ou des etapes.

export type KeyBind = { action: string; keys: string; primary?: boolean };

export type Item = {
  id: string;
  title: string;
  code: string; // monogramme affiche dans la tuile neon (2-4 car.)
  desc: string;
  link?: string;
  linkLabel?: string;
  cmd?: string; // commande copiable
  caveat?: string; // avertissement affiche sous la commande brew (ex: cask en retard)
  note?: string; // astuce / detail en plus
  keymap?: KeyBind[]; // raccourcis (Rectangle)
  native?: boolean; // rend une carte speciale "natif macOS" (presse-papier)
};

export type SectionKind = "steps" | "apps" | "optional";

export type Section = {
  id: string;
  num: string;
  title: string;
  tag: string; // libelle court facon "module"
  accent: string; // couleur neon (hex)
  intro?: string;
  kind: SectionKind;
  items: Item[];
};

// URL de l'installeur tout-en-un (mise a jour apres deploiement Vercel).
export const INSTALL_URL = "https://sabir-guidemacos.vercel.app/install.sh";

export const ONELINER = `curl -fsSL ${INSTALL_URL} | bash`;

export const SECTIONS: Section[] = [
  {
    id: "deballage",
    num: "00",
    title: "Au déballage",
    tag: "FIRST_BOOT",
    accent: "#00f0ff",
    kind: "steps",
    intro:
      "Les 5 minutes de réglages à faire en arrivant. Rien à installer, juste à cliquer — mais ça change tout le confort par la suite.",
    items: [
      {
        id: "appleid",
        title: "Connexion Apple ID / iCloud",
        code: "ID",
        desc: "Le compte qui débloque iCloud, l'App Store, le trousseau de mots de passe synchronisé et « Localiser » si le Mac est perdu. Sans lui, la moitié du système est bridée. Réglages → ton nom, tout en haut — à faire en premier.",
      },
      {
        id: "maj",
        title: "Mises à jour système",
        code: "UP",
        desc: "Un Mac « neuf » sort souvent d'usine avec une version en retard. Réglages → Général → Mise à jour de logiciels : installe tout maintenant, ça t'évite des bugs aléatoires et des incompatibilités d'outils dev plus tard.",
      },
      {
        id: "clavier",
        title: "Clavier rapide (mode dev)",
        code: "KB",
        desc: "Par défaut macOS « corrige » ton texte et répète les touches lentement — l'enfer pour coder (il met des majuscules, transforme tes variables). Réglages → Clavier : vitesse de répétition au max, délai au min, et désactive correction + majuscule auto.",
      },
      {
        id: "finder",
        title: "Finder utilisable",
        code: "FN",
        desc: "Le Finder cache des choses utiles par défaut : extensions de fichiers masquées, pas de barre de chemin, fichiers cachés invisibles (.env, .zshrc). Active la barre de chemin + les extensions (menu Présentation).",
        note: "Cmd + Shift + . affiche/masque les fichiers cachés. Réglages Finder → Avancé → coche « Afficher toutes les extensions ».",
      },
      {
        id: "trackpad",
        title: "Trackpad",
        code: "TP",
        desc: "macOS désactive « toucher pour cliquer » par défaut et met un curseur lent. Réglages → Trackpad : active le tap-to-click et monte la vitesse du curseur. Cinq secondes de réglage, un confort permanent.",
      },
      {
        id: "filevault",
        title: "Sécurité : FileVault + pare-feu",
        code: "FV",
        desc: "Sans FileVault, quelqu'un qui vole le Mac peut lire ton disque en le branchant ailleurs. FileVault chiffre tout, lié à ton mot de passe. Réglages → Confidentialité et sécurité → FileVault, et active le pare-feu pendant que tu y es.",
      },
    ],
  },
  {
    id: "prerequis",
    num: "01",
    title: "Les prérequis",
    tag: "CORE_DEPS",
    accent: "#ffb000",
    kind: "apps",
    intro:
      "Tout le reste dépend de ces deux-là. À lancer dans l'app Terminal (Cmd + Espace, tape « Terminal »).",
    items: [
      {
        id: "xcode-clt",
        title: "Xcode Command Line Tools",
        code: "XC",
        desc: "La boîte à outils de base d'Apple : compilateurs, make, et un git de secours. Beaucoup d'outils refusent de s'installer sans. macOS ne les met pas par défaut — une commande règle ça.",
        cmd: "xcode-select --install",
      },
      {
        id: "homebrew",
        title: "Homebrew",
        code: "BR",
        desc: "macOS n'a aucun gestionnaire de paquets natif (contrairement à apt sur Linux). Homebrew comble ce manque : c'est l'« apt du Mac ». Il installe 90 % de ce qui suit en une ligne et garde tout à jour avec brew upgrade.",
        link: "https://brew.sh",
        linkLabel: "brew.sh",
        cmd: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
        note: 'Après l\'install, ajoute brew au PATH :  echo \'eval "$(/opt/homebrew/bin/brew shellenv)"\' >> ~/.zprofile && eval "$(/opt/homebrew/bin/brew shellenv)"',
      },
    ],
  },
  {
    id: "terminal",
    num: "02",
    title: "Terminal & shell",
    tag: "SHELL_RIG",
    accent: "#00ff9c",
    kind: "apps",
    intro:
      "Le setup zsh + Powerlevel10k, exactement le mien. Le plus simple : lance le script tout-en-un en haut de page, il fait tout ça automatiquement.",
    items: [
      {
        id: "iterm2",
        title: "iTerm2",
        code: "IT",
        desc: "Le Terminal d'Apple est minimal. iTerm2 ajoute ce qui manque : volets divisés, recherche, profils, vraies couleurs, raccourcis. C'est ta maison quand tu codes.",
        link: "https://iterm2.com",
        linkLabel: "iterm2.com",
        cmd: "brew install --cask iterm2",
      },
      {
        id: "firacode",
        title: "FiraCode Nerd Font",
        code: "FC",
        desc: "Powerlevel10k affiche des icônes (git, dossiers, flèches) que les polices normales ne contiennent pas → sinon tu verrais des carrés vides. Les Nerd Fonts embarquent ces glyphes. Bonus : les ligatures (=>, !=) rendent le code plus lisible.",
        link: "https://www.nerdfonts.com",
        linkLabel: "nerdfonts.com",
        cmd: "brew install --cask font-fira-code-nerd-font",
        note: "Ensuite dans iTerm2 → Settings → Profiles → Text → Font : choisis « FiraCode Nerd Font ».",
      },
      {
        id: "zsh",
        title: "zsh + Oh My Zsh + Powerlevel10k",
        code: "ZS",
        desc: "macOS est livré avec zsh tout nu. Ici on installe MON setup complet : Oh My Zsh, le thème Powerlevel10k, et les plugins qui changent la vie (autocomplétion, coloration syntaxique, suggestions d'historique). Le script tout-en-un te le pose clé en main, identique au mien.",
        link: "https://github.com/Rayandri/zsh",
        linkLabel: "github.com/Rayandri/zsh",
        note: "Au 1er lancement, p10k peut proposer un assistant de config : tu peux le passer, mon config_p10k est déjà appliqué.",
      },
    ],
  },
  {
    id: "dev",
    num: "03",
    title: "Dev — les essentiels",
    tag: "DEV_STACK",
    accent: "#ff2bd6",
    kind: "apps",
    intro:
      "Les outils de dev qu'on utilise au quotidien. Chacun avec sa source officielle — privilégie-la pour toujours avoir la dernière version.",
    items: [
      {
        id: "vscode",
        title: "Visual Studio Code",
        code: "VS",
        desc: "macOS n'a aucun éditeur de code digne de ce nom par défaut (TextEdit ne compte pas). VS Code est le plus utilisé au monde : léger, extensible à l'infini, parfait pour démarrer sur n'importe quel projet.",
        link: "https://code.visualstudio.com",
        linkLabel: "code.visualstudio.com",
        cmd: "brew install --cask visual-studio-code",
      },
      {
        id: "cursor",
        title: "Cursor",
        code: "CR",
        desc: "VS Code dopé à l'IA : autocomplétion intelligente + un chat qui connaît toute ta codebase. On l'utilise beaucoup au quotidien — une fois habitué, tu ne reviens pas en arrière.",
        link: "https://cursor.com",
        linkLabel: "cursor.com",
        cmd: "brew install --cask cursor",
        caveat:
          "Le cask Homebrew traîne souvent loin derrière (il est resté bloqué des versions entières en retard). Préfère le lien officiel — l'app se met à jour toute seule ensuite.",
      },
      {
        id: "claude-code",
        title: "Claude Code (CLI)",
        code: "CC",
        desc: "L'agent IA directement dans le terminal — c'est littéralement lui qui a codé et déployé ce site. On l'installe avec l'installeur officiel (auto-update intégré, pas besoin de Node), PAS via Homebrew. Il faut un compte Anthropic payant.",
        link: "https://code.claude.com/docs",
        linkLabel: "code.claude.com",
        cmd: "curl -fsSL https://claude.ai/install.sh | bash",
        note: "Une fois installé, tape « claude » dans n'importe quel projet pour démarrer (login navigateur au 1er lancement). N'installe PAS via Homebrew : le cask suit le canal « stable » pendant que l'updater interne vise « latest » → désynchro, et brew refuse de mettre à jour. L'installeur officiel s'auto-update proprement.",
      },
      {
        id: "claude-app",
        title: "Claude (app desktop)",
        code: "CL",
        desc: "L'app Claude pour tout ce qui n'est pas du code : réflexion, rédaction, recherche, analyse de captures. Toujours à portée de raccourci, à côté du terminal.",
        link: "https://claude.ai/download",
        linkLabel: "claude.ai/download",
        cmd: "brew install --cask claude",
        caveat:
          "Le cask Claude se désynchronise entre canaux (stable vs latest) et brew ne le met pas à jour tout seul. Télécharge plutôt depuis le site officiel : tu as la dernière version dès le départ et l'app se maintient seule.",
      },
      {
        id: "docker",
        title: "Docker Desktop",
        code: "DK",
        desc: "Fait tourner des services (bases de données, API, redis…) dans des conteneurs isolés, sans rien installer en dur sur le Mac ni polluer le système. Quasi tous nos projets en dépendent.",
        link: "https://www.docker.com/products/docker-desktop",
        linkLabel: "docker.com",
        cmd: "brew install --cask docker-desktop",
      },
      {
        id: "node",
        title: "Node.js (via nvm)",
        code: "ND",
        desc: "Le runtime JavaScript (back, front, scripts, build). On passe par nvm parce que chaque projet veut sa version : l'un Node 18, l'autre Node 22 — nvm switche en une commande au lieu de tout casser.",
        link: "https://github.com/nvm-sh/nvm",
        linkLabel: "github.com/nvm-sh/nvm",
        cmd: "brew install nvm",
        note: 'Après : mkdir -p ~/.nvm puis ajoute dans ~/.zshrc :  export NVM_DIR="$HOME/.nvm"  et  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && . "/opt/homebrew/opt/nvm/nvm.sh"  — ensuite : nvm install --lts',
      },
      {
        id: "pyenv",
        title: "Python (via pyenv)",
        code: "PY",
        desc: "macOS embarque un Python système qu'il ne faut JAMAIS bricoler (le système s'en sert). pyenv installe tes propres versions à côté, et tu changes de version par projet sans rien casser.",
        link: "https://github.com/pyenv/pyenv",
        linkLabel: "github.com/pyenv/pyenv",
        cmd: "brew install pyenv",
      },
      {
        id: "gh",
        title: "Git + GitHub CLI",
        code: "GH",
        desc: "git est déjà là (via Xcode CLT). gh, c'est la CLI officielle GitHub : tu connectes ton compte une fois, puis tu clones / crées des repos / ouvres des PR sans jamais te battre avec les tokens d'accès.",
        link: "https://cli.github.com",
        linkLabel: "cli.github.com",
        cmd: "brew install gh && gh auth login",
      },
    ],
  },
  {
    id: "utils",
    num: "04",
    title: "Utilitaires — combler les manques",
    tag: "QOL_PATCH",
    accent: "#a855ff",
    kind: "apps",
    intro:
      "macOS est génial mais il manque des trucs de base que Windows/Linux ont. Voici les apps qui comblent ces manques — tu les installeras une fois et tu ne les remarqueras plus, tellement c'est devenu naturel.",
    items: [
      {
        id: "rectangle",
        title: "Rectangle — fenêtres au clavier",
        code: "RE",
        desc: "Tu connais i3 sur Linux ? C'est l'esprit, version Mac. macOS gère très mal le fenêtrage : pas de snap natif comme Windows (coller une fenêtre à gauche/droite au clavier). Rectangle ajoute ça. L'essentiel à rebinder façon Windows, c'est juste 3 raccourcis : moitié gauche, moitié droite, plein écran. Le reste reste sur les défauts de Rectangle.",
        link: "https://rectangleapp.com",
        linkLabel: "rectangleapp.com",
        cmd: "brew install --cask rectangle",
        note: "Dans Rectangle → Settings → Shortcuts, change uniquement les 3 raccourcis « essentiels » ci-dessous pour matcher les miens. Les autres sont déjà bien par défaut.",
        keymap: [
          { action: "Moitié gauche", keys: "⌘ ←", primary: true },
          { action: "Moitié droite", keys: "⌘ →", primary: true },
          { action: "Plein écran", keys: "⌘ ↑", primary: true },
          { action: "Restaurer", keys: "⌘ ↓" },
          { action: "Moitié haut", keys: "⌃ ⌥ ↑" },
          { action: "Moitié bas", keys: "⌃ ⌥ ↓" },
          { action: "Coin haut-gauche", keys: "⌃ ⌥ U" },
          { action: "Coin haut-droite", keys: "⌃ ⌥ I" },
          { action: "Coin bas-gauche", keys: "⌃ ⌥ J" },
          { action: "Coin bas-droite", keys: "⌃ ⌥ K" },
          { action: "Centrer", keys: "⌃ ⌥ C" },
          { action: "Écran suivant", keys: "⇧ ⌘ →" },
          { action: "Écran précédent", keys: "⇧ ⌘ ←" },
        ],
      },
      {
        id: "alttab",
        title: "AltTab — vrai Alt+Tab",
        code: "AT",
        desc: "Le Cmd+Tab d'Apple groupe par application et ne montre pas les fenêtres une par une — pénible quand tu as 3 fenêtres VS Code ouvertes. AltTab apporte le vrai Alt+Tab façon Windows : un aperçu visuel de chaque fenêtre pour switcher d'un coup d'œil.",
        link: "https://alt-tab-macos.netlify.app",
        linkLabel: "alt-tab-macos.netlify.app",
        cmd: "brew install --cask alt-tab",
      },
      {
        id: "amphetamine",
        title: "Amphetamine — garder éveillé",
        code: "AM",
        desc: "macOS met le Mac en veille tout seul, ce qui peut couper un build, un téléchargement ou une démo. Amphetamine garde la machine éveillée d'un clic, avec minuteries et conditions. Gratuit, mais uniquement sur le Mac App Store (pas dispo via brew).",
        link: "https://apps.apple.com/app/amphetamine/id937984704",
        linkLabel: "App Store",
        note: "Clique le lien et installe-la depuis le Mac App Store — c'est la seule source officielle.",
      },
      {
        id: "macsfan",
        title: "Macs Fan Control — températures",
        code: "MF",
        desc: "macOS ne montre ni les températures ni la vitesse des ventilos, et il les pousse souvent trop tard. Macs Fan Control affiche tout et te laisse forcer la ventilation quand un gros build fait chauffer la machine.",
        link: "https://crystalidea.com/macs-fan-control",
        linkLabel: "crystalidea.com",
        cmd: "brew install --cask macs-fan-control",
      },
      {
        id: "stats",
        title: "Stats — moniteur barre de menu",
        code: "ST",
        desc: "macOS n'a aucun moniteur système dans la barre de menu (il faut ouvrir « Moniteur d'activité » à la main). Stats affiche CPU, RAM, réseau, batterie et température en permanence. Léger, open-source et élégant.",
        link: "https://github.com/exelban/stats",
        linkLabel: "github.com/exelban/stats",
        cmd: "brew install --cask stats",
      },
      {
        id: "appcleaner",
        title: "AppCleaner — désinstaller proprement",
        code: "AC",
        desc: "Sur macOS, « désinstaller » = glisser l'app à la corbeille… sauf que ça laisse plein de fichiers planqués (préférences, caches, support) qui s'accumulent. AppCleaner détecte tous ces restes et supprime l'app en entier, proprement.",
        link: "https://freemacsoft.net/appcleaner",
        linkLabel: "freemacsoft.net",
        cmd: "brew install --cask appcleaner",
      },
      {
        id: "clipboard-spotlight",
        title: "Presse-papier : Spotlight natif",
        code: "CB",
        native: true,
        desc: "Avant, il fallait une app dédiée (genre Maccy) pour garder l'historique des copier-coller. C'est devenu inutile : depuis macOS 26 (Tahoe), Spotlight garde l'historique du presse-papier nativement. Une app de moins à installer.",
        note: "Ouvre Spotlight (Cmd + Espace), va dans les modes de navigation et choisis l'historique du presse-papier (il garde tes copies récentes ~8h). Active-le une fois, c'est bon.",
      },
    ],
  },
  {
    id: "annexe",
    num: "05",
    title: "Plus tard / optionnel",
    tag: "OPTIONAL",
    accent: "#ff6b3d",
    kind: "optional",
    intro:
      "Pas urgent au démarrage. À garder sous le coude pour le jour où le besoin se présente.",
    items: [
      {
        id: "macmousefix",
        title: "Mac Mouse Fix",
        code: "MM",
        desc: "Utile seulement si tu branches une souris : macOS gère mal le défilement (saccadé) et les boutons latéraux d'une souris tierce. Mac Mouse Fix rend le scroll fluide et te laisse binder les boutons (gestes, raccourcis). Rien d'urgent — le jour où tu as une souris.",
        link: "https://macmousefix.com",
        linkLabel: "macmousefix.com",
        cmd: "brew install --cask mac-mouse-fix",
      },
      {
        id: "hiddenbar",
        title: "Hidden Bar",
        code: "HB",
        desc: "Quand la barre de menu se remplit d'icônes, macOS n'offre aucun moyen de les ranger. Hidden Bar les masque derrière une flèche. Sur ton 16 pouces tu as largement la place au début — à garder pour quand la barre déborde.",
        link: "https://github.com/dwarvesf/hidden",
        linkLabel: "github.com/dwarvesf/hidden",
        cmd: "brew install --cask hiddenbar",
      },
    ],
  },
];
