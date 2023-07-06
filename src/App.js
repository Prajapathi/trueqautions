import React, { useEffect, useState } from "react";

export default function App() {
  const [listData, setListData] = useState([]);
  const [search, setSearch] = useState("");
  const [radio, setRadio] = useState(0)

  // let newArray = listData

  // const [renderList, setRenderList] = useState(listData)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setListData(json));
  }, []);


  const eventHandler = e => {

    if (e.target.value !== "") {
      setSearch(e.target.value)
    }
  }

  const radioClick = e => {
    setRadio(e.target.id)
  }

  // console.log(newArray);



  return (
    <div className="App">
      <div>
        <input name="name" id="name" width='100px' height='100px' onChange={e => eventHandler(e)} />
        <label name='asc'>ASC</label>
        <input id="asc" type="radio" name='order' number={'asc'} onClick={e => radioClick(e)} checked={radio === 'asc'} />
        <label name='desc'>DESC</label>
        <input id="desc" type="radio" name='order' number={'desc'} onClick={e => radioClick(e)} checked={radio === 'desc'} />
      </div>
      {listData.filter(data => {
        return data.title.toLowerCase().includes(search.toLowerCase())
      }).sort(
        (a, b) => {
          if (radio === 'asc') {
            if (a.title > b.title) {
              return 1
            }
            else {
              return -1
            }
          }
          else {
            if (a.title < b.title) {
              return 1
            }
            else {
              return -1
            }
          }
        }
      ).map((data) => {
        return <div>
          <img src={data.image} width='100px' heigh='100px' alt={data.title} />
          <p>{data.title}</p>
        </div>
      })
      }
      <div>

      </div>
    </div>
  )
};

