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
  const [newColor, setnewColor] = useState({ name: "", code: { hex: "" })
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => colors.map(color => color.id === res.data.id ? updateColors([...colors, { [color]: res }]) : ""), console.log(colors))
      .catch(err => console.error(err))
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`colors/${color.id}`).then(res => console.log(res)).catch(err => console.error(err))
  };
  const addNewColor = (e) => {
    e.preventDefault()
    axiosWithAuth().post(`/colors`, newColor)
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  }
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
      <form onSubmit={addNewColor}>
        <input
          placeholder="colorname"
          name="colorName"
          value={newColor.name}
          onChange={setnewColor(...newColor, newColor.name)
          } />
        <input
          placeholder="colorCodeHex"
          name="hex"
          value={newColor.code.hex}
          onChange={setnewColor(...newColor, newColor.code.hex)}
        />
        <button type="submit">add new color</button>
      </form>
    </div>
  );
};

export default ColorList;
