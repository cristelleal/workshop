import { useState, useEffect } from "react";
import "./homepage.css";
import Modal from "../modal/modal";

type Props = {
  onStart?: (pseudo: string) => void;
};

export default function Homepage({ onStart }: Props) {
  const [pseudo, setPseudo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const environmentFacts = [
    "🌍 Plus de 8 millions de tonnes de plastique finissent dans les océans chaque année",
    "🌱 Une forêt de la taille d'un terrain de football disparaît toutes les secondes",
    "♻️ Recycler une tonne de papier permet de sauver 17 arbres",
    "🌡️ La température moyenne mondiale a augmenté de 1,1°C depuis 1880",
    "💧 L'agriculture consomme 70% de l'eau douce mondiale",
  ];

  useEffect(() => {
    setIsLoaded(true);

    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % environmentFacts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [environmentFacts.length]);

  const handleStart = () => {
    if (!pseudo.trim()) {
      setShowModal(true);
      return;
    }
    if (onStart) {
      onStart(pseudo);
    } else {
      alert(`Bienvenue ${pseudo} ! Le quiz va commencer...`);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && pseudo.trim()) {
      handleStart();
    }
  };

  return (
    <>
      <Modal isOpen={showModal} onClose={closeModal} title="Pseudo requis">
        <p>Merci d'entrer un pseudo avant de commencer le quiz !</p>
      </Modal>

      <main id="homepage" className={isLoaded ? "loaded" : ""}>
        <div className="floating-elements">
          <div className="floating-element leaf">🍃</div>
          <div className="floating-element earth">🌍</div>
          <div className="floating-element recycle">♻️</div>
          <div className="floating-element tree">🌳</div>
          <div className="floating-element drop">💧</div>
        </div>

        <div className="container">
          <header className="header">
            <div className="logo-wrapper">
              <div className="logo">
                <img
                  src="/src/assets/logo.png"
                  alt="logo"
                  className="logo-img"
                />
                <div className="logo-glow"></div>
              </div>
            </div>
          </header>

          <div className="fact-banner">
            <div className="fact-content">
              <span className="fact-label">Le saviez-vous ?</span>
              <p className="fact-text">{environmentFacts[currentFactIndex]}</p>
            </div>
          </div>

          <div className="card">
            <div className="card-section">
              <h2 className="section-title">À propos</h2>
              <p className="info-text">
                Testez vos connaissances environnementales dans un quiz ludique
                et interactif. Chaque bonne réponse vous rapproche d'un avenir
                plus durable
              </p>
            </div>

            <div className="card-section">
              <h2 className="section-title">Thématiques</h2>
              <div className="topics-grid">
                <div className="topic-card">
                  <span className="topic-icon">🌡️</span>
                  <span className="topic-text">Changement climatique</span>
                </div>
                <div className="topic-card">
                  <span className="topic-icon">♻️</span>
                  <span className="topic-text">Biodiversité</span>
                </div>
                <div className="topic-card">
                  <span className="topic-icon">⚡</span>
                  <span className="topic-text">Énergies renouvelables</span>
                </div>
              </div>
            </div>

            <div className="card-section">
              <div className="form-group">
                <div className="input-wrapper">
                  <input
                    id="pseudo"
                    type="text"
                    className="input"
                    placeholder="Entrez votre pseudo..."
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                    onKeyPress={handleKeyPress}
                    maxLength={20}
                  />
                  <div className="input-highlight"></div>
                </div>
              </div>
            </div>

            <div className="card-section">
              <button
                onClick={handleStart}
                className={`button ${pseudo.trim() ? "ready" : ""}`}
                disabled={!pseudo.trim()}
              >
                <span className="button-content">
                  <span className="button-text">Commencer le quiz</span>
                </span>
                <div className="button-ripple"></div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
