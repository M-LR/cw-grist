import { useState, useEffect } from 'react';

// Assumes 'grist' is available globally (e.g., via a script tag in index.html)
// If 'grist' is provided by an npm package, use: import grist from 'grist';

const Title = () => {
  const [titre, setTitre] = useState('Mon application React');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialiser Grist
    window.grist.ready({
      requiredAccess: 'read table',
      columns: ['Titre_principale']
    });

    // Écouter l'enregistrement sélectionné
    window.grist.onRecord((record) => {
        // Vérifier si l'enregistrement contient le champ Titre_principale
      
      if (record && record.Titre_principale) {
        setTitre(record.Titre_principale);
      }
      setIsLoading(false);
    });

  }, []);

  if (isLoading) {
    return <h1 className="fr-h1">Chargement...</h1>;
  }

  return <h1 className="fr-h1">{titre}</h1>;
};

export default Title