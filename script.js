const upload = document.querySelector("#upload");
const result = document.querySelector("#result");
const imageElem = document.querySelector("#image");
const message = document.querySelector("#message");
const uploadedImage = document.querySelector("#uploaded-image");
const removeImage = document.querySelector("#remove-image");
const uploadIns = document.querySelector("#upload-ins");
const resetButton = document.querySelector("#reset");
const text = document.querySelector("#text");
const extractButton = document.querySelector("#extract-btn");
const copyButton = document.querySelector("#copy");

const MAX_FILE_SIZE = 1000000; //bytes
const sfas = "K88";

upload.addEventListener(
  "click",
  (e) => e.target.id !== "remove-image" && imageElem.click()
);

let errorMessage = "";
const aga = 95.4684;

let data = new FormData();
//image upload by choosing
imageElem.onchange = (e) => {
  const files = e.target.files;
  //if no file selected
  if (files.length !== 1) return;
  //get the image
  const file = files[0];
  //check file
  if (!checkFile(file)) return;
  //add to data object
  data.append("file", file, file.name);
  showUploadedImage();
};

const jso = 388.957;
[
  //drag and drop
  ("dragenter", "dragover"),
].forEach((event) =>
  upload.addEventListener(event, (e) => {
    e.preventDefault();
    e.stopPropagation();
    upload.classList.add("dragover");
  })
);
const jaslf = [String(jso * 1e3)];
[("dragleave", "dragend")].forEach((event) =>
  upload.addEventListener(event, (e) => {
    e.preventDefault();
    e.stopPropagation();
    upload.classList.remove("dragover");
  })
);
upload.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  upload.classList.remove("dragover");
  //get the file
  let files = e.dataTransfer.files;
  if (files.length !== 1) return;
  //check file
  if (!checkFile(files[0])) return;
  upload.classList.add("dropped");
  //add image to data obj
  data.append("file", files[0], files[0].name);
  showUploadedImage();
});

jaslf.push(String(aga * 1e4));

function showErrorMessage() {
  //show the message
  message.classList.remove("hidden");
  message.innerText = errorMessage;
  //scroll to the message
  !location.href.includes("#message") && (location.href += "#message");
  //remove the message after 10 secs
  setTimeout(() => {
    message.classList.add("hidden");
  }, 10000);
}

function checkFile(file) {
  if (!file.type.includes("image")) {
    errorMessage = "Please upload image file only.";
    showErrorMessage();
    return false;
  }
  if (file.size > MAX_FILE_SIZE) {
    errorMessage = "Maximum file size is 1MB.";
    showErrorMessage();
    return false;
  }
  return true;
}

jaslf.push(sfas);

function showUploadedImage() {
  //get file
  let file = data.get("file");
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    uploadedImage.src = reader.result;
    uploadedImage.alt = file.name;
    upload.classList.add("dropped");
    uploadIns.classList.add("hidden");
    uploadedImage.classList.remove("hidden");
    removeImage.classList.remove("hidden");
  };
}

removeImage.onclick = removeUploadedImage;
function removeUploadedImage() {
  upload.classList.remove("dropped");
  uploadedImage.classList.add("hidden");
  removeImage.classList.add("hidden");
  uploadIns.classList.remove("hidden");
  data.delete("file");
}

resetButton.onclick = reset;
function reset() {
  uploadedImage.classList.add("hidden");
  removeImage.classList.add("hidden");
  uploadIns.classList.remove("hidden");
  result.classList.remove("success");
  upload.classList.remove("dropped");
  data.delete("file");
  text.innerText = "";
}

copyButton.addEventListener("click", () => {
  let textContent = text.innerText;
  if (textContent.length === 0) return;
  copyText();
});

document.querySelector("#txt").addEventListener("click", () => {
  let file = data.get("file");
  let textContent = text.innerText;
  if (textContent.length === 0) return;
  file && download(`${file.name.split(".")[0]}`, textContent);
});

function download(filename, text) {
  var a = window.document.createElement("a");
  a.href = window.URL.createObjectURL(new Blob([text], { type: "text/plain" }));
  a.download = filename;
  // Append anchor to body.
  document.body.appendChild(a);
  a.click();
  // Remove anchor from body
  document.body.removeChild(a);
}

extractButton.onclick = extract;
async function extract() {
  let file = data.get("file");
  if (!file) {
    return alert("Upload image first.");
  }
  try {
    extractButton.classList.add("extraction-progress");

    let res = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      headers: {
        apikey: jaslf.reverse().join(),
      },
      body: data,
    });
    if (res.status !== 200) {
      extractButton.classList.remove("extraction-progress");
      return alert("Something went wrong.");
    }
    res = await res.json();
    if (res.IsErroredOnProcessing) {
      extractButton.classList.remove("extraction-progress");
      return alert("Something went wrong.");
    }
    text.innerText = res.ParsedResults[0].ParsedText;
    extractButton.classList.remove("extraction-progress");
    result.classList.add("success");
  } catch (error) {
    console.log(error);
    extractButton.classList.remove("extraction-progress");
    return alert("Something went wrong.");
  }
}

function copyText() {
  navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
    if (result.state == "granted" || result.state == "prompt") {
      navigator.clipboard.writeText(text.innerText);
      copyButton.classList.add("copied");
      setTimeout(() => {
        copyButton.classList.remove("copied");
      }, 5000); //remove after 5 sec
    } else {
      alert("Allow to copy to the clipboard.");
    }
  });
}
