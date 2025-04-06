import { useEffect, useState } from "react";
import "./PulserasStyle.scss";
import destellos from "../../public/Destelleos.png";

const Pulseras = () => {
    const [pulseras, setPulseras] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [slideIndex, setSlideIndex] = useState({});
    const [openCategorias, setOpenCategorias] = useState({});

    // Fetch categorías
    useEffect(() => {
        fetch("https://insutec.shop/phpmar/categorias.php")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setCategorias(data.data);
                } else {
                    console.error("No se encontraron categorías");
                }
            })
            .catch((err) => {
                console.error("Error al obtener categorías:", err);
            });
    }, []);

    // Fetch pulseras
    useEffect(() => {
        fetch("https://insutec.shop/phpmar/pulseras.php")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPulseras(data.data);
                } else {
                    console.error("No se encontraron pulseras");
                }
            })
            .catch((err) => {
                console.error("Error al obtener pulseras:", err);
            });
    }, []);

    const handleToggle = (categoriaId) => {
        setOpenCategorias((prev) => ({
            ...prev,
            [categoriaId]: !prev[categoriaId],
        }));
    };

    const handleSlide = (categoriaId, direction, totalSlides) => {
        setSlideIndex((prev) => {
            const currentIndex = prev[categoriaId] || 0;
            const newIndex =
                direction === "next"
                    ? (currentIndex + 1) % totalSlides
                    : (currentIndex - 1 + totalSlides) % totalSlides;

            return {
                ...prev,
                [categoriaId]: newIndex,
            };
        });
    };

    const getPulserasPorCategoria = (categoriaId) =>
        pulseras.filter((p) => p.categoria_id === categoriaId);

    return (
        <div className="pulseras-wrapper">
            {categorias.map((cat) => {
                const pulserasCategoria = getPulserasPorCategoria(cat.id);
                const index = slideIndex[cat.id] || 0;
                return (
                    <>
                        <p className="btn" onClick={() => handleToggle(cat.id)}>
                            <img src={destellos.src} alt="Destellos" />
                            {cat.nombre}
                        </p>

                        {openCategorias[cat.id] && (
                            <div className="slider-wrapper">
                                <div
                                    className="slider"
                                    style={{
                                        transform: `translateX(-${index * 100}%)`,
                                    }}
                                >
                                    {pulserasCategoria.map((pulsera, i) => (
                                        <div key={i} className="slide">
                                            <article className="textos__slider">
                                                <h6>{pulsera.nombre}</h6>
                                                <span>$ {pulsera.precio}</span>
                                            </article>
                                            <img src={pulsera.imagen} alt={pulsera.nombre} />
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="prev"
                                    onClick={() =>
                                        handleSlide(cat.id, "prev", pulserasCategoria.length)
                                    }
                                >
                                    <svg viewBox="0 0 24 24">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M12 21a9 9 0 1 0 0 -18a9 9 0 0 0 0 18"></path>
                                        <path d="M8 12l4 4"></path>
                                        <path d="M8 12h8"></path>
                                        <path d="M12 8l-4 4"></path>
                                    </svg>
                                </button>
                                <button
                                    className="next"
                                    onClick={() =>
                                        handleSlide(cat.id, "next", pulserasCategoria.length)
                                    }
                                >
                                    <svg viewBox="0 0 24 24">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18"></path>
                                        <path d="M16 12l-4 -4"></path>
                                        <path d="M16 12h-8"></path>
                                        <path d="M12 16l4 -4"></path>
                                    </svg>
                                </button>
                            </div>
                        )}
                    </>
                );
            })}
        </div>
    );
};

export default Pulseras;
