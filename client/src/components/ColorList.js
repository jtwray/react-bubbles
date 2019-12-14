import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newcolor, setnewColor] = useState({ color: "", code:{hex: "" }})
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = async e => {
    e.preventDefault();
    await( axiosWithAuth().put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res =>  console.log('colors',colors,"res",res,"res.data.code.hex",res.data.code.hex))
      .catch(err => console.error(err)))
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().get(`/colors`).then(res=>updateColors(res.data)).then(_=>console.log(colors)).catch(err=>console.error(err))
  };

  const deleteColor = async color => {
    // make a delete request to delete this color
    await(axiosWithAuth().delete(`colors/${color.id}`).then(res => console.log(res)).catch(err => console.error(err)))
    axiosWithAuth().get(`/colors`).then(res=>updateColors(res.data)).then(_=>console.log(colors)).catch(err=>console.error(err))
  };
  const addNewColor =async(event,newcolor) => {
    event.preventDefault()
    console.log('newcolor:',newcolor)
    await (axiosWithAuth().post(`/colors`, newcolor)
      .then(res => console.log(res.data))
      .catch(err => console.error(err)))
      axiosWithAuth().get(`/colors`).then(res=>updateColors(res.data)).then(_=>console.log(colors)).catch(err=>console.error(err))
    };

  
 
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={event=>addNewColor(event,newcolor)}>
        <input
          placeholder="newcolor"
          type="text"
          name="color"
          value={newcolor.color}
          onChange={e=>setnewColor({...newcolor, color:e.target.value})}
           
           />
        <input
          placeholder="colorCodeHex"
          type="text"
          name="hex"
          value={newcolor.code.hex}
          onChange={e=>setnewColor({...newcolor, code:{hex:e.target.value}})}
        />
        <button type="submit">add new color</button>
      </form>
    </div>
  );
};

export default ColorList;
