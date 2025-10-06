import { useState } from "react";
import "./homepage.css";
import Modal from "../modal/modal";

type Props = {
  onStart?: (pseudo: string) => void;
};

export default function Homepage({ onStart }: Props) {
  const [pseudo, setPseudo] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  return (
    <>
      <Modal isOpen={showModal} onClose={closeModal} title="Pseudo requis">
        <p>Merci d'entrer un pseudo avant de commencer le quiz !</p>
      </Modal>
      
      <main id="homepage">
        <div className="container">
          <header className="header">
            <div className="logo-wrapper">
              <div className="logo">
                <img
                  src="/src/assets/logo.png"
                  alt="logo"
                  className="logo-img"
                />
              </div>
            </div>
          </header>

          <div className="card">
            <div className="card-section">
              <h2 className="section-title">À propos</h2>
              <p className="info-text">
                Testez vos connaissances environnementales dans un quiz ludique
                et interactif. Chaque bonne réponse vous rapproche d'un avenir
                plus durable 🌍
              </p>
            </div>

            <div className="card-section">
              <h2 className="section-title">Thématiques</h2>
              <ul className="list">
                <li className="list-item">
                  Changement climatique et effet de serre
                </li>
                <li className="list-item">Biodiversité et écosystèmes</li>
                <li className="list-item">Énergies renouvelables</li>
                <li className="list-item">
                  Gestion des déchets et économie circulaire
                </li>
              </ul>
            </div>

            <div className="card-section">
              <h2 className="section-title">Informations</h2>
              <div className="badges">
                <span className="badge">Niveau débutant</span>
                <span className="badge">Tous publics</span>
                <span className="badge">Questions variées</span>
              </div>
            </div>

            <div className="card-section">
              <div className="form-group">
                <label htmlFor="pseudo" className="label">
                  Votre pseudo
                </label>
                <input
                  id="pseudo"
                  type="text"
                  className="input"
                  placeholder="Entrez votre pseudo..."
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  maxLength={20}
                />
              </div>
            </div>

            <div className="card-section">
              <button onClick={handleStart} className="button">
                Commencer
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
