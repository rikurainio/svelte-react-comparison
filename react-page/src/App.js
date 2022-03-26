import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [paragraphs, setParagraphs] = useState([])
  const [domManipTime, setDomManipTime] = useState()

  const [isFirstLoading, setIsFirstLoading] = useState(true)
  const [updateDetector, toggleUpdate] = useState(true)

  const size  = ["nano", "tiny", "small", "medium", "large", "mega"]
	const color = ["red", "orange", "yellow", "green", "cyan", "blue", "magenta", "purple"]
	const item  = ["cup", "coffee cup", "tea cup", "coffee machine", "brewer",
				  "roaster", "blender", "ice-machine", "chair", "table",
				  "bagel", "donut", "cupcake"]

	const generateAmount = 10
  let domManipulationTime

  useEffect(() => {
    if(isFirstLoading){
      setIsFirstLoading(false)
    }
    let t1 = performance.now()
    domManipulationTime = t1 - t0
    console.log("dom rerendered in: ", domManipulationTime)
    setDomManipTime(domManipulationTime)
  }, [updateDetector])

	function createElements(amount){
    let newParagraphs = [...paragraphs]
		for(let i=0; i < amount; i++){
      newParagraphs.push(generateSentence())
		}
    setParagraphs(newParagraphs)
    toggleUpdate(!updateDetector)
	}
	function clearElement(type){
		if(type == "paragraphs"){
			setParagraphs([])
      toggleUpdate(!updateDetector)
		}
	}
	function removeRandom(){
		if(paragraphs.length > 0){
			let removeIndex = Math.floor(Math.random() * paragraphs.length)
			let newParagraphs = [...paragraphs]
      newParagraphs.splice(removeIndex,1)
			setParagraphs(newParagraphs)
      toggleUpdate(!updateDetector)
		}
	}
	function removeElementX(x){
		if(paragraphs.length > 0 && x >= -1 && x < paragraphs.length){
			let newParagraphs = [...paragraphs]
      newParagraphs.splice(x,1)
			setParagraphs(newParagraphs)
      toggleUpdate(!updateDetector)
		}
	}
	function addElementX(x){
		if(paragraphs.length > 0){
      let newParagraphs = [...paragraphs]
			if(x == 'start'){
				newParagraphs.unshift(generateSentence())
			}
			if(x == 'end'){
				newParagraphs.push(generateSentence())
			}
			if(x == 'middle'){
				newParagraphs.splice(paragraphs.length / 2, 0, generateSentence())
			}
			setParagraphs(newParagraphs)
      toggleUpdate(!updateDetector)
		}
	}
	function editRandom(){
		if(paragraphs.length > 0){
			let randomIndex = Math.floor(Math.random() * paragraphs.length)

      let newParagraphs = [...paragraphs]
      newParagraphs[randomIndex] = generateSentence()
      setParagraphs(newParagraphs)
      toggleUpdate(!updateDetector)
		}
	}
	function swapTwoRandom(){
		if(paragraphs.length > 1){
      let newParagraphs = [...paragraphs]

			let randomIndex1 = Math.floor(Math.random() * paragraphs.length)
			let randomIndex2 = null

			while(randomIndex2 == null || randomIndex2 == randomIndex1){
				randomIndex2 = Math.floor(Math.random() * paragraphs.length)
			}

			let firstIndexData = newParagraphs[randomIndex1]
			let secondIndexData = newParagraphs[randomIndex2]
			newParagraphs[randomIndex1] = secondIndexData
			newParagraphs[randomIndex2] = firstIndexData
      setParagraphs(newParagraphs)
      toggleUpdate(!updateDetector)
		}
	}
	function generateSentence(){
		let si= Math.floor(Math.random() * size.length)
		let ci = Math.floor(Math.random() * color.length)
		let ii = Math.floor(Math.random() * item.length)
		let randomSentence = size[si] + " " + color[ci] + " " + item[ii]
		return randomSentence
	}

  let t0 = performance.now()
  return (
    <div>
      <div className='buttonsContainer'>
        <div className='buttonRow'>
          <button id="button-insert-10" onClick={() => {createElements(generateAmount)}}>
            insert {generateAmount} p tags
          </button>
          <button id="button-insert-100" onClick={() => {createElements(generateAmount*10)}}>
            insert {generateAmount*10} p tags
          </button>
          <button id="button-insert-1000" onClick={() => {createElements(generateAmount*100)}}>
            insert {generateAmount*100} p tags
          </button>
          <button id="button-insert-10000" onClick={() => {createElements(generateAmount*1000)}}>
            insert {generateAmount*1000} p tags
          </button>
        </div>
        
        <div className='buttonRow'>
          <button id="button-remove-start" onClick={() => {removeElementX(0)}}>
            delete first p tag
          </button>
          <button id="button-remove-middle" onClick={() => {removeElementX(paragraphs.length / 2)}}>
            delete p tag from middle
          </button>
          <button id="button-remove-end" onClick={() => {removeElementX(-1)}}>
            delete last p tag
          </button>
      
          <button id="button-add-start" onClick={() => {addElementX('start')}}>
            add to beginning
          </button>
          <button id="button-add-middle" onClick={() => {addElementX('middle')}}>
            add to middle
          </button>
          <button id="button-add-end" onClick={() => {addElementX('end')}}>
            add to end
          </button>
        </div>
        
        <div className='buttonRow'>
          <button id="button-edit-random" onClick={() => {editRandom()}}>
            edit one random p tag
          </button>
          <button id="button-swap-two-random" onClick={() => {swapTwoRandom()}}>
            swap two random p tags
          </button>
          <button id="button-delete-random" onClick={() => {removeRandom()}}>
            delete one random p tag
          </button>
          <button id="button-delete-all" onClick={() => {clearElement("paragraphs")}}>
            delete all p tags
          </button>
        </div>
      </div>

	<div>
		<h1 className='title'>performance benchmark</h1>
	</div>
	<div className='measurementContainer'>
			<p>time: &nbsp;</p>
			<p id='measurement'>{domManipTime} s</p>
			<p>&nbsp; ms</p>
	</div>

	<div className='mainContent'>
		<div>
      {paragraphs.map((p, i) => {
        return(
          <p key={"p-"+ i}>{p}</p>
        )
      })}
		</div>
	</div>

    </div>
  );
}

export default App;
