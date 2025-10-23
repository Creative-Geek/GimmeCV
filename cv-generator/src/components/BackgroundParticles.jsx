import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function BackgroundParticles() {
  const init = useCallback(async (engine) => {
    // load the slim bundle for smaller size
    await loadSlim(engine);
  }, []);

  const options = {
    background: {
      color: { value: "#ffffff" },
    },
    fullScreen: { enable: false },
    fpsLimit: 60,
    detectRetina: true,
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: { enable: true, mode: "parallax" },
        resize: true,
      },
      modes: {
        parallax: {
          enable: true,
          force: 60,
          smooth: 10,
        },
      },
    },
    particles: {
      number: {
        value: 75,
        density: { enable: true, area: 1200 },
      },
      color: { value: "#0b0b0b" },
      links: {
        enable: true,
        color: "#0b0b0b",
        distance: 140,
        opacity: 0.25,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.3,
        direction: "none",
        outModes: "out",
      },
      opacity: { value: 0.6 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 2.5 } },
    },
  };

  return (
    <div className="bg-particles">
      <Particles id="tsparticles" init={init} options={options} />
    </div>
  );
}
