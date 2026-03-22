function createOverlay() {
  stopScroll();

  const extensionArea = document.createElement("div");
  extensionArea.id = "extension-area";

  //   -------- COMPONENTS --------
  // Upload Screen Component
  function createUploadScreen() {
    return `
 <div id="upload-screen-container">
<div id="upload-screen" class="active" for="upload-screen-file-input" style="cursor: pointer; display: block; text-align: center;">
  <div class="upload-content active">
    <div style="margin-bottom: 24px;">     
      <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" fill="currentColor" class="bi bi-patch-plus-fill" viewBox="0 0 16 16">
           <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0"/>
       </svg>

       <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" fill="currentColor" class="bi bi-x-octagon-fill" viewBox="0 0 16 16">
  <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" fill="currentColor" class="bi bi-cloud-check-fill" viewBox="0 0 16 16">
  <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 4.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
</svg>
    </div>

    <div class="upload-text active-text">
    <h4 style="font-weight: 600; margin: 0;">Upload Screenshot</h4>

    <h5 style="color: #666; font-weight: 400; margin-top: 8px;">
          Upload a screenshot
    </h5>
     <div style="display:flex;gap:12px;align-items:center;justify-content:center;width:100%;margin-top:8px;">

    <label for="upload-screen-file-input" class="primary-btn">
      Upload
    </label>
    </div>
    </div>

    <div class="upload-text failed-text">
    <h4 style="font-weight: 600; margin: 0;">Upload Failed</h4>

    <h5 style="color: #666; font-weight: 400; margin-top: 8px;">
          Please try again
    </h5>
    </div>
    
    <div class="upload-text success-text">
    <h4 style="font-weight: 600; margin: 0;">Upload Success</h4>

    <h5 style="color: #666; font-weight: 400; margin-top: 8px;">
          Your screenshot has been uploaded
    </h5>

    <div style="display:flex;gap:12px;align-items:center;justify-content:center;width:100%;margin-top:8px;">
    
    <button id="upload-again-btn" class="secondary-btn">
      Upload Again
    </button>

    <button id="continue-btn" class="primary-btn">
      Continue
    </button>
    </div>
    </div>

  </div>
</div>

      <input type="file" id="upload-screen-file-input" accept=".jpg, .jpeg, .png" hidden/>
    </div>
    `;
  }

  //  --------- INITIATE PAGE ---------
  extensionArea.innerHTML = `
    ${createUploadScreen()}
  `;
  document.body.appendChild(extensionArea);
  if (STENSYL_DEBUG) console.log("upload screen created");
  //  --------- END OF INITIATE PAGE ---------

  // upload image handler logic
  const fileInput = document.getElementById("upload-screen-file-input");
  const uploadLabel = document.getElementById("upload-screen");
  const uploadContent = document.querySelector(".upload-content");

  if (!fileInput || !uploadLabel) return;

  // Reusable function to handle the "Failed" animation
  let errorTimeoutId = null;
  const triggerErrorState = () => {
    if (errorTimeoutId) {
      clearTimeout(errorTimeoutId);
      errorTimeoutId = null;
    }
    uploadContent.classList.remove("active", "success");
    uploadContent.classList.add("failed");
    fileInput.value = ""; // Reset so they can try again

    errorTimeoutId = setTimeout(() => {
      uploadContent.classList.remove("failed");
      uploadContent.classList.add("active");
    }, 1500);
  };

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedMimeTypes = ["image/jpeg", "image/png"];
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const ext = file.name?.split(".").pop()?.toLowerCase();

    // 1. Check Format
    const isAllowed =
      file.type?.length > 0
        ? allowedMimeTypes.includes(file.type)
        : allowedExtensions.includes(ext);

    if (!isAllowed) {
      triggerErrorState();
      return;
    }

    // 2. Process File
    const reader = new FileReader();
    reader.onerror = () => triggerErrorState(); // Handle file reading errors

    reader.onload = () => {
      const base64String = reader.result;

      // 3. Attempt Storage
      chrome.storage.local.set({ lastScreenshot: base64String }, () => {
        // Check for chrome.runtime.lastError (e.g., quota exceeded)
        if (chrome.runtime.lastError) {
          console.error("Storage Error:", chrome.runtime.lastError.message);
          triggerErrorState();
        } else {
          if (errorTimeoutId) {
            clearTimeout(errorTimeoutId);
            errorTimeoutId = null;
          }
          if (STENSYL_DEBUG)
            console.log("Before class change:", uploadLabel.className);

          uploadContent.classList.remove("active", "failed");
          uploadContent.classList.add("success");

          if (STENSYL_DEBUG)
            console.log("After class change:", uploadLabel.className);
        }
      });
    };

    reader.readAsDataURL(file);
  });

  //   listen for upload again button click removes last screenshot from storage and resets the upload screen to active state

  const uploadAgainBtn = document.getElementById("upload-again-btn");
  if (uploadAgainBtn) {
    uploadAgainBtn.addEventListener("click", () => {
      chrome.storage.local.remove("lastScreenshot", () => {
        if (chrome.runtime.lastError) {
          console.error("Error clearing storage:", chrome.runtime.lastError);
        } else if (STENSYL_DEBUG) {
          console.log("Memory cleared: lastScreenshot removed.");
        }
      });

      if (errorTimeoutId) {
        clearTimeout(errorTimeoutId);
        errorTimeoutId = null;
      }
      fileInput.value = "";
      uploadContent.classList.remove("active", "failed", "success");
      uploadContent.classList.add("active");
    });
  }

  // 3. EVENT LISTENER: Simple and clean
  const continueBtn = document.getElementById("continue-btn");
  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      if (STENSYL_DEBUG) console.log("Transitioning to canvas...");
      switchToCanvas();
    });
  }
}
