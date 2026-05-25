/** Bandeau explicatif : pourquoi privilegier les sources officielles aux casks. */
export default function InfoCallout() {
  return (
    <div className="callout reveal">
      <span className="callout-edge" aria-hidden />
      <div className="callout-head">
        <span className="callout-tag">INFO</span>
        Liens officiels d'abord — pourquoi ?
      </div>
      <p className="callout-body">
        Les casks Homebrew des apps graphiques sont souvent{" "}
        <b>en retard sur la dernière version</b> (le cask Cursor est resté
        bloqué des versions entières derrière ; le cask Claude se désynchronise
        entre canaux stable/latest). Et pour les apps qui{" "}
        <b>se mettent à jour toutes seules</b>, <code>brew upgrade</code> ne les
        touche même pas.
      </p>
      <p className="callout-body">
        → Pour ces apps, <b>télécharge depuis la source officielle</b> : tu as
        la dernière version dès le départ et elle se maintient seule. Homebrew
        reste parfait pour les <b>outils CLI</b> (git, nvm, pyenv, neovim…), où
        c'est lui qui gère les mises à jour.
      </p>
    </div>
  );
}
