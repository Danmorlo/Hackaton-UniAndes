var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var cw = canvas.width;
var ch = canvas.height;
var phrases = ['Pulpo', 'Erizo', 'Abeja', 'Perro', 'Jirafa', 'Gato'];
var mockImages = [
  'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F19-1572106646295?alt=media&token=82d4933e-4eae-4e51-943d-0d12d6bc9036',
  'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F22-1572109366370?alt=media&token=3c448d74-3996-4212-9967-281c1e9ba9f4',
  'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F10-1572109266296?alt=media&token=fa24e33f-e29a-40c7-97b5-3388fc4cb97e',
  'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F52-1572109441181?alt=media&token=4da42055-df80-426b-a0c1-a4f8d9686d18',
  'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F72-1572109515494?alt=media&token=94725b21-3d1e-4afe-bd83-056cd37fe90e'
];
var phrase = document.getElementById('phrase');
var img = document.getElementById('img-pop');
var index = Math.round(Math.random() * (phrases.length - 1));
phrase.innerText = phrases[index];
img.src = mockImages[index];
// used to calc canvas position relative to window
function reOffset() {
  var BB = canvas.getBoundingClientRect();
  offsetX = BB.left;
  offsetY = BB.top;
}
var offsetX, offsetY;
reOffset();
window.onscroll = function(e) {
  reOffset();
};
window.onresize = function(e) {
  reOffset();
};
canvas.onresize = function(e) {
  reOffset();
};

function copy(mainObj) {
  let objCopy = {}; // objCopy will store a copy of the mainObj
  let key;

  for (key in mainObj) {
    objCopy[key] = mainObj[key]; // copies each property to the objCopy object
  }
  return objCopy;
}
// save relevant information about shapes drawn on the canvas
var shapes = [];
// define one circle and save it in the shapes[] array
var shapeType = {
  rectangle: { x: 260, y: 420, width: 90, height: 50, color: '#ffff6a' },
  square: { x: 400, y: 420, width: 50, height: 50, color: '#00ff74' },
  circle: { x: 100, y: 450, radius: 30, color: '#808080' },
  smallCircle: { x: 200, y: 450, radius: 15, color: '#ff5a5a' },
  triangle: {
    x: 480,
    y: 420,
    width: 50,
    height: 50,
    half: true,
    color: '#bf62fc'
  },
  bigTriangle: {
    x: 570,
    y: 420,
    width: 70,
    height: 70,
    half: true,
    color: '#6066fe'
  }
};

shapes.push(copy(shapeType.rectangle));
shapes.push(copy(shapeType.square));
shapes.push(copy(shapeType.circle));
shapes.push(copy(shapeType.smallCircle));
shapes.push(copy(shapeType.triangle));
shapes.push(copy(shapeType.bigTriangle));

// drag related vars
var isDragging = false;
var startX, startY;

// hold the index of the shape being dragged (if any)
var selectedShapeIndex;

// draw the shapes on the canvas
drawAll();

// listen for mouse events
canvas.onmousedown = handleMouseDown;
canvas.onmousemove = handleMouseMove;
canvas.onmouseup = handleMouseUp;
canvas.onmouseout = handleMouseOut;

// given mouse X & Y (mx & my) and shape object
// return true/false whether mouse is inside the shape
function isMouseInShape(mx, my, shape) {
  if (shape.radius) {
    // this is a circle
    var dx = mx - shape.x;
    var dy = my - shape.y;
    // math test to see if mouse is inside circle
    if (dx * dx + dy * dy < shape.radius * shape.radius) {
      // yes, mouse is inside this circle
      return true;
    }
  } else if (shape.half) {
    // this is a rectangle
    var rLeft = shape.x;
    var rRight = shape.x + shape.width;
    var rTop = shape.y;
    var rBott = shape.y + shape.height;
    // math test to see if mouse is inside rectangle
    if (mx > rLeft && mx < rRight && my > rTop && my < rBott) {
      return true;
    }
  } else if (shape.width) {
    // this is a rectangle
    var rLeft = shape.x;
    var rRight = shape.x + shape.width;
    var rTop = shape.y;
    var rBott = shape.y + shape.height;
    // math test to see if mouse is inside rectangle
    if (mx > rLeft && mx < rRight && my > rTop && my < rBott) {
      return true;
    }
  }
  // the mouse isn't in any of the shapes
  return false;
}

function handleMouseDown(e) {
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
  // calculate the current mouse position
  startX = parseInt(e.clientX - offsetX);
  startY = parseInt(e.clientY - offsetY);
  // test mouse position against all shapes
  // post result if mouse is in a shape
  for (var i = shapes.length - 1; i >= 0; i--) {
    if (isMouseInShape(startX, startY, shapes[i])) {
      // the mouse is inside this shape
      // select this shape
      selectedShapeIndex = i;
      // set the isDragging flag
      isDragging = true;
      // and return (==stop looking for
      //     further shapes under the mouse)
      return;
    }
  }
}

function handleMouseUp(e) {
  // return if we're not dragging
  if (!isDragging) {
    return;
  }
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
  // the drag is over -- clear the isDragging flag
  isDragging = false;
}

function handleMouseOut(e) {
  // return if we're not dragging
  if (!isDragging) {
    return;
  }
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
  // the drag is over -- clear the isDragging flag
  isDragging = false;
}

function handleMouseMove(e) {
  // return if we're not dragging
  if (!isDragging) {
    return;
  }
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();
  // calculate the current mouse position
  mouseX = parseInt(e.clientX - offsetX);
  mouseY = parseInt(e.clientY - offsetY);
  // how far has the mouse dragged from its previous mousemove position?
  var dx = mouseX - startX;
  var dy = mouseY - startY;
  // move the selected shape by the drag distance
  var selectedShape = shapes[selectedShapeIndex];
  selectedShape.x += dx;
  selectedShape.y += dy;
  // clear the canvas and redraw all shapes
  drawAll();
  // update the starting drag position (== the current mouse position)
  startX = mouseX;
  startY = mouseY;
}

// clear the canvas and
// redraw all shapes in their current positions
function drawAll() {
  ctx.clearRect(0, 0, cw, ch);
  for (var i = 0; i < shapes.length; i++) {
    var shape = shapes[i];
    if (shape.radius) {
      // it's a circle
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
      ctx.fillStyle = shape.color;
      ctx.fill();
    } else if (shape.half) {
      // it's a rectangle
      ctx.beginPath();
      ctx.moveTo(shape.x, shape.y);
      ctx.lineTo(shape.x + shape.width, shape.y);
      ctx.lineTo(shape.x, shape.y + shape.height);
      ctx.closePath();

      // the fill color
      ctx.fillStyle = shape.color;
      ctx.fill();
    } else if (shape.width) {
      // it's a rectangle
      ctx.fillStyle = shape.color;
      ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
    }
  }
}

function clearCanvas() {
  shapes = [];
  drawAll();
}

function insertShape(shape) {
  shapes.push(copy(shapeType[shape]));
  drawAll();
}

function exportImg() {
  /*var image = canvas
    .toDataURL('image/png')
    .replace('image/png', 'image/octet-stream'); // here is the most important part because if you dont replace you will get a DOM 18 exception.

  window.location.href = image;*/
  canvas.toBlob(function(blob) {
    var image = new Image();
    image.src = blob;
    var storageRef = firebase.storage().ref();
    var randomCode =
      Math.round(Math.random() * 100) + '-' + new Date().getTime();
    var uploadTask = storageRef.child('images/' + randomCode).put(blob);

    uploadTask.on(
      'state_changed',
      function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      function(error) {
        // Handle unsuccessful uploads
      },
      function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...

        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
        });
      }
    );
  });
}
