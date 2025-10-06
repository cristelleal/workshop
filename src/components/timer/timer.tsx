//CSS
import "./timer.css";
//REACT
import { useState, useEffect } from "react";
//
//
//
//
//
export default function Timer() {
  //
  //
  // VARIABLE
  //
  //
  const [temperature, setTemperature] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0); // Temps écoulé indépendant
  const [creditDebt, setCreditDebt] = useState(0); // Crédit de refroidissement (dette)
  /// Constantes
  const MAX_TEMP = 4;
  const MIN_TEMP = 0;
  const TOTAL_TIME_MS = 10 * 60 * 1000; // 10 minutes
  const UPDATE_INTERVAL_MS = 1000; // 1 seconde
  /// Calcul de l'incrément par mise à jour
  const incrementPerUpdate = (MAX_TEMP / TOTAL_TIME_MS) * UPDATE_INTERVAL_MS;
  /// Hauteur de la barre de progression en pourcentage
  const displayedTemp = Math.max(0, Math.min(MAX_TEMP, temperature));
  const progressHeight = (displayedTemp / MAX_TEMP) * 100;
  /// Calcul du temps restant (basé sur le temps écoulé, pas la température affichée)
  const timeRemaining =
    isTimerActive && elapsedTime < TOTAL_TIME_MS
      ? ((TOTAL_TIME_MS - elapsedTime) / 1000 / 60).toFixed(1)
      : 0;
  //
  //
  // FONCION
  //
  //
  /// Effet pour l'auto-incrémentation de la température basée sur le temps
  useEffect(() => {
    if (!isTimerActive) return;

    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        const newTime = prev + UPDATE_INTERVAL_MS;

        // Calcul de la température basée sur le temps écoulé
        const newTimeBasedTemp = (newTime / TOTAL_TIME_MS) * MAX_TEMP;

        // Si on atteint ou dépasse la température max, on arrête le timer
        if (newTimeBasedTemp >= MAX_TEMP) {
          setIsTimerActive(false);
          setTemperature(MAX_TEMP);
          setCreditDebt(0);
          return TOTAL_TIME_MS;
        }

        // On augmente la température en fonction du temps
        setTemperature((prevTemp) => {
          // Si on a un crédit de dette, on l'absorbe d'abord
          if (creditDebt > 0) {
            const newDebt = creditDebt - incrementPerUpdate;
            setCreditDebt(Math.max(0, newDebt));

            // Si la dette n'est pas encore épuisée, la température ne bouge pas
            if (newDebt > 0) {
              return prevTemp;
            }

            // S'il reste un incrément après avoir épuisé la dette
            const remainingIncrement = Math.abs(Math.min(0, newDebt));
            return Math.min(MAX_TEMP, prevTemp + remainingIncrement);
          }

          // Pas de dette, on augmente normalement
          const newTemp = prevTemp + incrementPerUpdate;
          return Math.min(MAX_TEMP, newTemp);
        });

        return newTime;
      });
    }, UPDATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [incrementPerUpdate, isTimerActive, creditDebt]);
  /// Couleur dynamique : jaune → rouge
  const getProgressColor = () => {
    const ratio = displayedTemp / MAX_TEMP;
    // Interpolation entre jaune (#FFD700) et rouge (#FF0000)
    const red = 255;
    const green = Math.floor(215 * (1 - ratio));
    const blue = 0;
    return `rgb(${red}, ${green}, ${blue})`;
  };
  //
  /// Fonction pour ajuster manuellement la température
  const adjustTemperature = (delta) => {
    setTemperature((prev) => {
      // Si on ajoute de la chaleur (+delta) et qu'on a une dette
      if (delta > 0 && creditDebt > 0) {
        // On épuise d'abord la dette
        const newDebt = creditDebt - delta;

        if (newDebt > 0) {
          // La dette n'est pas encore épuisée, température reste à 0
          setCreditDebt(newDebt);
          return 0;
        } else {
          // La dette est épuisée, on augmente la température du reste
          setCreditDebt(0);
          const remainingHeat = Math.abs(newDebt);
          const newTemp = prev + remainingHeat;

          // Si on atteint ou dépasse MAX_TEMP, on arrête le timer
          if (newTemp >= MAX_TEMP) {
            setIsTimerActive(false);
            return MAX_TEMP;
          }

          return newTemp;
        }
      }

      // Sinon, comportement normal
      const newTemp = prev + delta;

      // Si on atteint ou dépasse MAX_TEMP, on arrête le timer
      if (newTemp >= MAX_TEMP) {
        setIsTimerActive(false);
        setCreditDebt(0);
        return MAX_TEMP;
      }

      // Si on descend en dessous de 0, on crée un crédit de dette
      if (newTemp < 0) {
        const debt = Math.abs(newTemp);
        setCreditDebt((prevDebt) => prevDebt + debt);
        return 0; // La température affichée reste à 0
      }

      // On réactive le timer si on était à MAX_TEMP
      if (prev >= MAX_TEMP && newTemp < MAX_TEMP) {
        setIsTimerActive(true);
      }

      return newTemp;
    });
  };
  //
  //
  // BUILD
  //
  //
  ///
  const graduation = (
    <>
      {[0, 1, 2, 3, 4].map((temp) => (
        <div key={temp}>
          {/* Label à droite */}
          <div
            style={{
              position: "absolute",
              bottom: `${
                temp === 0
                  ? 5 + (temp / MAX_TEMP) * 100
                  : temp === 4
                  ? (temp / MAX_TEMP) * 100 - 5
                  : (temp / MAX_TEMP) * 100
              }%`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              left: "20px",
              transform: "translateY(50%)",
              fontSize: "14px",
              fontWeight: "500",
              color: "#333",
            }}
          >
            {temp}°C
          </div>

          {/* Trait gauche */}
          <div
            style={{
              position: "absolute",
              bottom: `${(temp / MAX_TEMP) * 100}%`,
              left: "-10px",
              width: "15px",
              height: "2px",
              backgroundColor: "#333",
            }}
          />

          {/* Trait droit */}
          <div
            style={{
              position: "absolute",
              bottom: `${(temp / MAX_TEMP) * 100}%`,
              right: "-10px",
              width: "15px",
              height: "2px",
              backgroundColor: "#333",
            }}
          />
        </div>
      ))}
    </>
  );
  ///
  const thermostat = (
    <>
      <div
        style={{
          position: "relative",
          width: "60px",
          height: "320px",
          backgroundColor: "transparent",
          border: "2px solid #333",
          borderRadius: "30px",
          overflow: "hidden",
        }}
      >
        {/* Barre de progression */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: `${progressHeight}%`,
            backgroundColor: getProgressColor(),
            transition: "height 0.5s ease, background-color 0.5s ease",
          }}
        />

        {/* Graduations et labels */}
        {graduation}
      </div>
    </>
  );
  ///
  const content = (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "tranparent",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "10px",
          backgroundColor: "transparent",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Thermostat</h2>

        {/* Thermomètre */}
        {thermostat}

        {/* Affichage de la température */}
        <div
          style={{
            marginTop: "25px",
            fontSize: "24px",
            fontWeight: "bold",
            color: getProgressColor(),
          }}
        >
          {displayedTemp.toFixed(2)}°C
          {creditDebt > 0 && (
            <span
              style={{ fontSize: "16px", marginLeft: "10px", color: "#4ecdc4" }}
            >
              (dette: {creditDebt.toFixed(2)}°C)
            </span>
          )}
        </div>

        {/* Affichage END ou GAME OVER */}
        {!isTimerActive && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px 25px",
              backgroundColor: temperature >= 4 ? "#dc3545" : "#ffc107",
              color: temperature >= 4 ? "white" : "#333",
              borderRadius: "10px",
              fontSize: "28px",
              fontWeight: "bold",
              letterSpacing: "2px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            {temperature >= 4 ? "🔥 GAME OVER 🔥" : "✅ END"}
          </div>
        )}

        {/* Informations supplémentaires */}
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "5px",
            fontSize: "14px",
            color: "#666",
            textAlign: "center",
            minWidth: "250px",
          }}
        >
          <p style={{ margin: "5px 0" }}>
            {isTimerActive && elapsedTime < TOTAL_TIME_MS ? (
              <>Temps restant : {timeRemaining} min</>
            ) : (
              <>Température maximale atteinte</>
            )}
          </p>
          {creditDebt > 0 && (
            <p style={{ margin: "5px 0", color: "#4ecdc4", fontWeight: "600" }}>
              ❄️ Dette de refroidissement active
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return { content, adjustTemperature } as const;
}
