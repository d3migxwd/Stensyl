// 1. DUMB COMPONENT: Just generates HTML from a string
function createCanvasHTML(imageData) {
  return `
      <div id="canvas-container">
        <div id="canvas">
          <div id="canvasToggle" class="active">
             <div class="blur-btn circle" id="toggleCanvas">
                <span class="blur-btn-item hideCanvas">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                     <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                 </svg>
                </span>
                          <span class="blur-btn-item showCanvas">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
                     <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"/>
                   </svg>
                </span>
             </div>
     
           </div>
          <img src="${imageData}" id="screenshot-preview" alt="UI Screenshot">
            <div class="tools-container">
              ${blurButton({
                text: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
</svg>`,
                type: "circle",
                id: "decreaseSize",
              })}
              ${blurButton({
                text: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
</svg>`,
                type: "circle",
                id: "increaseSize",
              })}
               <div class="blur-btn" style="gap: 8px;justify-content: space-between;" id="toolKit">
                    <h6 class="blur-btn-item">${getActiveTool().text} <span style="font-weight: 400;font-size: 14px;font-style: italic;">(<span id="toolValue">${getDisplayPercentForActiveTool()}</span>%)</span></h6>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-chevron-expand" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708m0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708"/>
</svg>
              </div>
          </div>
        </div>

      </div>
    `;
}

function blurButton(item = { text: "", type: "", id: "" }) {
  return `
    <div class="blur-btn ${item.type}" id="${item.id}">
      <span class="blur-btn-item">${item.text}</span>
    </div>
  `;
}
