import React, { useEffect, useRef, useState } from "react";
import { useFetchTodos } from "../hooks/useFetchTodos";
import axios from "axios";

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 20% 20%, #1a1a2e 0%, #0f0f1e 40%, #000 100%)",
    padding: "60px 20px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: "#fff",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "48px",
    fontWeight: "800",
    margin: 0,
    background:
      "linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  subtitle: {
    color: "#8b8ba7",
    marginTop: "8px",
    fontSize: "14px",
    letterSpacing: "3px",
    textTransform: "uppercase",
  },

  formWrap: {
    maxWidth: "720px",
    margin: "0 auto 50px auto",
    padding: "28px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.04)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow:
      "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
    position: "relative",
    overflow: "hidden",
  },
  formGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: "linear-gradient(90deg, #06ffa5, #3a86ff, #8338ec, #ff006e)",
  },
  formTitle: {
    fontSize: "18px",
    fontWeight: "700",
    margin: "0 0 18px 0",
    color: "#fff",
    letterSpacing: "1px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  formDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#06ffa5",
    boxShadow: "0 0 12px #06ffa5",
  },
  formRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  input: {
    flex: "1 1 200px",
    padding: "14px 18px",
    fontSize: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(0, 0, 0, 0.3)",
    color: "#fff",
    outline: "none",
    transition: "border 0.2s ease, box-shadow 0.2s ease",
  },
  btnPrimary: {
    padding: "14px 28px",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    background: "linear-gradient(135deg, #8338ec 0%, #3a86ff 100%)",
    boxShadow: "0 4px 20px rgba(131, 56, 236, 0.4)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  btnGhost: {
    padding: "14px 24px",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    cursor: "pointer",
    color: "#a8a8c0",
    background: "transparent",
    transition: "all 0.2s ease",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
    listStyle: "none",
    padding: 0,
  },
  card: {
    position: "relative",
    padding: "24px",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.04)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow:
      "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  glow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: "linear-gradient(90deg, #ff006e, #8338ec, #3a86ff, #06ffa5)",
  },
  badge: {
    display: "inline-block",
    padding: "4px 12px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    borderRadius: "20px",
    background: "rgba(131, 56, 236, 0.2)",
    color: "#c084fc",
    border: "1px solid rgba(131, 56, 236, 0.4)",
    marginBottom: "14px",
    textTransform: "uppercase",
    width: "fit-content",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    margin: "0 0 12px 0",
    color: "#fff",
    display: "block",
  },
  cardDesc: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#a8a8c0",
    display: "block",
    flexGrow: 1,
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
    paddingTop: "16px",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
  },
  iconBtn: {
    flex: 1,
    padding: "10px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
    borderRadius: "10px",
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },
  editBtn: {
    background: "rgba(58, 134, 255, 0.15)",
    color: "#60a5fa",
    border: "1px solid rgba(58, 134, 255, 0.3)",
  },
  deleteBtn: {
    background: "rgba(255, 0, 110, 0.15)",
    color: "#ff5c8a",
    border: "1px solid rgba(255, 0, 110, 0.3)",
  },
  cardEditing: {
    border: "1px solid rgba(58, 134, 255, 0.5)",
    boxShadow:
      "0 8px 32px rgba(58, 134, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  },
  inlineInput: {
    width: "100%",
    padding: "10px 14px",
    fontSize: "14px",
    borderRadius: "10px",
    border: "1px solid rgba(58, 134, 255, 0.4)",
    background: "rgba(0, 0, 0, 0.3)",
    color: "#fff",
    outline: "none",
    marginBottom: "10px",
    boxSizing: "border-box",
  },
  empty: {
    textAlign: "center",
    color: "#8b8ba7",
    fontSize: "16px",
    padding: "40px",
  },
};

const Todos = () => {
  const [todos, fetchTodos] = useFetchTodos();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);
  const todosData = todos?.data;

  const handleHover = (e, isEnter) => {
    e.currentTarget.style.transform = isEnter
      ? "translateY(-6px) scale(1.02)"
      : "translateY(0) scale(1)";
    e.currentTarget.style.boxShadow = isEnter
      ? "0 16px 48px rgba(131, 56, 236, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
      : "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
  };

  const handleInputFocus = (e, isFocus) => {
    e.currentTarget.style.border = isFocus
      ? "1px solid rgba(131, 56, 236, 0.6)"
      : "1px solid rgba(255, 255, 255, 0.1)";
    e.currentTarget.style.boxShadow = isFocus
      ? "0 0 0 3px rgba(131, 56, 236, 0.15)"
      : "none";
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const titleValue = titleRef.current.value;
    const descriptionValue = descriptionRef.current.value;
    try {
      const res = await axios.post(
        "http://localhost:5000/todos",
        {
          title: titleValue,
          description: descriptionValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      titleRef.current.value = "";
      descriptionRef.current.value = "";
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/todos/${id}`, {
        title: editTitle,
        description: editDescription,
      });
      cancelEdit();
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Todos</h1>
        <p style={styles.subtitle}>— Stay focused. Get things done —</p>
      </div>

      <form style={styles.formWrap} onSubmit={handleAdd}>
        <div style={styles.formGlow} />
        <h3 style={styles.formTitle}>
          <span style={styles.formDot} />
          New Todo
        </h3>
        <div style={styles.formRow}>
          <input
            ref={titleRef}
            style={styles.input}
            type="text"
            placeholder="Title..."
            onFocus={(e) => handleInputFocus(e, true)}
            onBlur={(e) => handleInputFocus(e, false)}
          />
          <input
            ref={descriptionRef}
            style={styles.input}
            type="text"
            placeholder="Description..."
            onFocus={(e) => handleInputFocus(e, true)}
            onBlur={(e) => handleInputFocus(e, false)}
          />
          <button
            type="submit"
            style={styles.btnPrimary}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 28px rgba(131, 56, 236, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(131, 56, 236, 0.4)";
            }}
          >
            + Add
          </button>
        </div>
      </form>

      {!todosData && <div style={styles.empty}>Yuklanmoqda...</div>}

      <ul style={styles.grid}>
        {todosData?.map((todo, index) => {
          const isEditing = editingId === todo.id;
          return (
            <li
              key={todo.id}
              style={{
                ...styles.card,
                ...(isEditing ? styles.cardEditing : {}),
              }}
              onMouseEnter={(e) => !isEditing && handleHover(e, true)}
              onMouseLeave={(e) => !isEditing && handleHover(e, false)}
            >
              <div style={styles.glow} />
              <span style={styles.badge}>
                #{String(index + 1).padStart(2, "0")}
              </span>

              {isEditing ? (
                <>
                  <input
                    style={styles.inlineInput}
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Title"
                  />
                  <input
                    style={styles.inlineInput}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Description"
                  />
                </>
              ) : (
                <>
                  <span style={styles.cardTitle}>{todo.title}</span>
                  <span style={styles.cardDesc}>{todo.description}</span>
                </>
              )}

              <div style={styles.actions}>
                {isEditing ? (
                  <>
                    <button
                      style={{ ...styles.iconBtn, ...styles.editBtn }}
                      onClick={() => handleUpdate(todo.id)}
                    >
                      ✓ Save
                    </button>
                    <button
                      style={{ ...styles.iconBtn, ...styles.deleteBtn }}
                      onClick={cancelEdit}
                    >
                      ✕ Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={{ ...styles.iconBtn, ...styles.editBtn }}
                      onClick={() => startEdit(todo)}
                    >
                      ✎ Edit
                    </button>
                    <button
                      style={{ ...styles.iconBtn, ...styles.deleteBtn }}
                      onClick={() => handleDelete(todo.id)}
                    >
                      🗑 Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todos;
