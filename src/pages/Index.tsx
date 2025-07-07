const Index = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "blue", fontSize: "32px" }}>iDATA - Тест</h1>
      <p>Если вы видите этот текст, React работает правильно!</p>
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
        }}
      >
        <h2>Проверка базовой функциональности</h2>
        <p>Сайт загружается без ошибок</p>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Тестовая кнопка
        </button>
      </div>
    </div>
  );
};

export default Index;
