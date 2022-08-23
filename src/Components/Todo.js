import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";

export default function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // add
  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd
    });

    setTodo("");
  };

  // update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd
    });

    setTodo("");
    setIsEdit(false);
  };

  // delete
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  return (
    
    <div className="main-div">
    <div className="child-div">
    <span>
    <i onClick={handleSignOut} className="fa fa-power-off" aria-hidden="true"></i> 
            <p>Sing Out</p>
          </span>
    <div className="addItems">
      <input
        
        type="text"
        placeholder="📝Add Items"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      
      {isEdit ? (
        <i className="far fa-edit add-btn" onClick={handleEditConfirm}></i>
        ) : (
        <i className="fa fa-plus add-btn" onClick={writeToDatabase}></i>
      )}
      </div>

      <div className="showItems">
      {todos.map((todo) => {
        return (
        <div className="eachItem">
        <h3>{todo.todo}</h3>
        <div className="todo-btn">
        <i className="fa fa-edit add-btn" onClick={() => handleUpdate(todo)}></i>
          
          <i className="far fa-trash-alt add-btn" onClick={() => handleDelete(todo.uidd)}></i>
          </div>
        
        </div>
      );
      })}
     </div>        
    </div>
    </div>
  );
}
