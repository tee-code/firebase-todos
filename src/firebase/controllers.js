import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from './index';

const addTodo = (todo) => {
    try {
        const docRef = addDoc(collection(db, "todos"), todo);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const readTodosInRealTime = () => {

    let todos = [];

    const unsubscribe = onSnapshot(collection(db, 'todos'), (querySnapshot) => {

        const fbtodos = [];

        querySnapshot.forEach((doc) => {
            fbtodos.push(doc.data());
        });

        todos = fbtodos;

    });

    return todos;
}

const deleteTodo = (id) => {
    deleteDoc(doc(db, "todos", id));
}

const updateTodo = (id, data) => {
    updateDoc(doc(db, 'todos', id), data);
}

export {
    addTodo,
    readTodosInRealTime,
    deleteTodo,
    updateTodo
}