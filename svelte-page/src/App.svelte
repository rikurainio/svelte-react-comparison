<script>
	import { beforeUpdate, afterUpdate } from 'svelte';

	let domManipulationTime
	let generateAmount = 10
	let paragraphs = []

	let size  = ["nano", "tiny", "small", "medium", "large", "mega"]
	let color = ["red", "orange", "yellow", "green", "cyan", "blue", "magenta", "purple"]
	let item  = ["cup", "coffee cup", "tea cup", "coffee machine", "brewer",
				  "roaster", "blender", "ice-machine", "chair", "table",
				  "bagel", "donut", "cupcake"]

	let t0 = 0
	let t1 = 0

	beforeUpdate(() => {
		t0 = performance.now()
	});

	afterUpdate(() => {
		t1 = performance.now()
		domManipulationTime = t1 - t0
	});

	function createElements(amount){
		for(let i=0; i < amount; i++){
			paragraphs = [...paragraphs, generateSentence()]
		}
	}
	function clearElement(type){
		if(type == "paragraphs"){
			paragraphs = []
		}
	}
	function removeRandom(){
		if(paragraphs.length > 0){
			let removeIndex = Math.floor(Math.random() * paragraphs.length)
			paragraphs.splice(removeIndex,1)
			paragraphs = paragraphs
		}
	}
	function removeElementX(x){
		if(paragraphs.length > 0 && x >= -1 && x < paragraphs.length){
			paragraphs.splice(x,1)
			paragraphs = paragraphs
		}
	}
	function addElementX(x){
		if(paragraphs.length > 0){
			if(x == 'start'){
				paragraphs.unshift(generateSentence())
			}
			if(x == 'end'){
				paragraphs.push(generateSentence())
			}
			if(x == 'middle'){
				paragraphs.splice(paragraphs.length / 2, 0, generateSentence())
			}
			paragraphs = paragraphs
		}
	}
	function editRandom(){
		if(paragraphs.length > 0){
			let randomIndex = Math.floor(Math.random() * paragraphs.length)
			paragraphs[randomIndex] = generateSentence()
		}
	}
	function swapTwoRandom(){
		if(paragraphs.length > 1){
			let randomIndex1 = Math.floor(Math.random() * paragraphs.length)
			let randomIndex2 = null

			while(randomIndex2 == null || randomIndex2 == randomIndex1){
				randomIndex2 = Math.floor(Math.random() * paragraphs.length)
			}

			let firstIndexData = paragraphs[randomIndex1]
			let secondIndexData = paragraphs[randomIndex2]
			paragraphs[randomIndex1] = secondIndexData
			paragraphs[randomIndex2] = firstIndexData
		}
	}
	function generateSentence(){
		let si= Math.floor(Math.random() * size.length)
		let ci = Math.floor(Math.random() * color.length)
		let ii = Math.floor(Math.random() * color.length)
		let randomSentence = size[si] + " " + color[ci] + " " + item[ii]
		return randomSentence
	}
</script>

<main>
	<div class='buttonsContainer'>
		<div class='buttonRow'>
			<button id="button-1" on:click={() => {createElements(generateAmount)}}>
				insert {generateAmount} p tags
			</button>
			<button id="button-2" on:click={() => {createElements(generateAmount*10)}}>
				insert {generateAmount*10} p tags
			</button>
			<button id="button-2" on:click={() => {createElements(generateAmount*100)}}>
				insert {generateAmount*100} p tags
			</button>
			<button id="button-2" on:click={() => {createElements(generateAmount*1000)}}>
				insert {generateAmount*1000} p tags
			</button>
		</div>
		
		<div class='buttonRow'>
			<button id="button-remove-start" on:click={() => {removeElementX(0)}}>
				delete first p tag
			</button>
			<button id="button-remove-middle" on:click={() => {removeElementX(paragraphs.length / 2)}}>
				delete p tag from middle
			</button>
			<button id="button-remove-end" on:click={() => {removeElementX(-1)}}>
				delete last p tag
			</button>
	
			<button id="button-remove-start" on:click={() => {addElementX('start')}}>
				add to beginning
			</button>
			<button id="button-remove-idx-6000" on:click={() => {addElementX('middle')}}>
				add to middle
			</button>
			<button id="button-remove-end" on:click={() => {addElementX('end')}}>
				add to end
			</button>
		</div>
		
		<div class='buttonRow'>
			<button id="button-3" on:click={() => {editRandom()}}>
				edit one random p tag
			</button>
			<button id="button-4" on:click={() => {removeRandom()}}>
				delete one random p tag
			</button>
			<button id="button-6" on:click={() => {swapTwoRandom()}}>
				swap two random p tags
			</button>
			<button id="button-5" on:click={() => {clearElement("paragraphs")}}>
				delete all p tags
			</button>
		
		</div>
	</div>

	<div>
		<h1 class='title'>performance benchmark</h1>
	</div>
	<div class='measurementContainer'>
		{#if domManipulationTime}
			<p>time: &nbsp</p>
			<p id='measurement'>{domManipulationTime}</p>
			<p>&nbsp ms</p>
		{/if}
	</div>

	<div class='mainContent'>
		<div>
			{#each paragraphs as p, i}
				<p key={"p-" + i}>{p}</p>
			{/each}
		</div>
	</div>
</main>

<style>
	.title {
		text-align: center;
	}

	button {
		margin: 5px;
		background-color: transparent;
		border: 2px solid cadetblue;
	}

	.buttonsContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.mainContent {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-content: center;
		margin: 0 auto;
	}

	.mainContent > div {
		padding: 10px;
	}

	.measurementContainer {
		display: flex;
		justify-content: center;
		text-align: center;
	}
	.buttonRow {
		display: flex;
	}
	#measurement {
		font-weight: 500;
	}
</style>