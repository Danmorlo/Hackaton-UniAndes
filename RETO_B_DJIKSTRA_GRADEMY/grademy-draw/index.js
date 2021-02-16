var canvas;
var context;
var phrases = ['Pulpo', 'Erizo', 'Abeja', 'Perro', 'Jirafa', 'Gato'];
var mockImages = [
  'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F85-1572104348924?alt=media&token=c926b4bb-d058-42a7-9f57-66e2195f7a87',
  'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F83-1572104655516?alt=media&token=2e4d3471-755d-4e64-97e0-8ee0df029ca0',
  'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F80-1572104797169?alt=media&token=774285ca-4e0d-408b-b9e8-c5d27dd82af1',
  'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F72-1572104971521?alt=media&token=daf673a5-75bb-4311-b8fa-881e869a1f2d',
  'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F2-1572105232306?alt=media&token=aeb5023e-0d9f-41fc-b8a3-64f1a2ad06f5',
  'https://firebasestorage.googleapis.com/v0/b/grademy-4b8be.appspot.com/o/images%2F20-1572105484884?alt=media&token=90ad80a6-04b5-4d83-9ed7-0c410ef931d0'
];

$(document).ready(function() {
  initialize();
});
var index;
// works out the X, Y position of the click inside the canvas from the X, Y position on the page

function getPosition(mouseEvent, sigCanvas) {
  var rect = sigCanvas.getBoundingClientRect();
  return {
    X: mouseEvent.clientX - rect.left,
    Y: mouseEvent.clientY - rect.top
  };
}

function initialize() {
  // get references to the canvas element as well as the 2D drawing context
  var sigCanvas = document.getElementById('canvas');
  var phrase = document.getElementById('phrase');
  var img = document.getElementById('img-pop');
  index = Math.round(Math.random() * (phrases.length - 1));
  phrase.innerText = phrases[index];
  img.src = mockImages[index];
  canvas = sigCanvas;
  context = sigCanvas.getContext('2d');
  context.strokeStyle = '#808080';
  context.lineJoin = 'miter';
  context.lineWidth = 8;

  // This will be defined on a TOUCH device such as iPad or Android, etc.
  var is_touch_device = 'ontouchstart' in document.documentElement;

  if (is_touch_device) {
    // create a drawer which tracks touch movements
    var drawer = {
      isDrawing: false,
      touchstart: function(coors) {
        context.beginPath();
        context.moveTo(coors.x, coors.y);
        this.isDrawing = true;
      },
      touchmove: function(coors) {
        if (this.isDrawing) {
          context.lineTo(coors.x, coors.y);
          context.stroke();
        }
      },
      touchend: function(coors) {
        if (this.isDrawing) {
          this.touchmove(coors);
          this.isDrawing = false;
        }
      }
    };

    // create a function to pass touch events and coordinates to drawer
    function draw(event) {
      // get the touch coordinates.  Using the first touch in case of multi-touch
      var coors = {
        x: event.targetTouches[0].pageX,
        y: event.targetTouches[0].pageY
      };

      // Now we need to get the offset of the canvas location
      var obj = sigCanvas;

      if (obj.offsetParent) {
        // Every time we find a new object, we add its offsetLeft and offsetTop to curleft and curtop.
        do {
          coors.x -= obj.offsetLeft;
          coors.y -= obj.offsetTop;
        } while (
          // The while loop can be "while (obj = obj.offsetParent)" only, which does return null
          // when null is passed back, but that creates a warning in some editors (i.e. VS2010).
          (obj = obj.offsetParent) != null
        );
      }

      // pass the coordinates to the appropriate handler
      drawer[event.type](coors);
    }

    // attach the touchstart, touchmove, touchend event listeners.
    sigCanvas.addEventListener('touchstart', draw, false);
    sigCanvas.addEventListener('touchmove', draw, false);
    sigCanvas.addEventListener('touchend', draw, false);

    // prevent elastic scrolling
    sigCanvas.addEventListener(
      'touchmove',
      function(event) {
        event.preventDefault();
      },
      false
    );
  } else {
    // start drawing when the mousedown event fires, and attach handlers to
    // draw a line to wherever the mouse moves to
    $('#canvas').mousedown(function(mouseEvent) {
      var position = getPosition(mouseEvent, sigCanvas);
      context.moveTo(position.X, position.Y);
      context.beginPath();

      // attach event handlers
      $(this)
        .mousemove(function(mouseEvent) {
          drawLine(mouseEvent, sigCanvas, context);
        })
        .mouseup(function(mouseEvent) {
          finishDrawing(mouseEvent, sigCanvas, context);
        })
        .mouseout(function(mouseEvent) {
          finishDrawing(mouseEvent, sigCanvas, context);
        });
    });
  }
}

// draws a line to the x and y coordinates of the mouse event inside
// the specified element using the specified context
function drawLine(mouseEvent, sigCanvas, context) {
  var position = getPosition(mouseEvent, sigCanvas);

  context.lineTo(position.X, position.Y);
  context.stroke();
}

// draws a line from the last coordiantes in the path to the finishing
// coordinates and unbind any event handlers which need to be preceded
// by the mouse down event
function finishDrawing(mouseEvent, sigCanvas, context) {
  // draw the line to the finishing coordinates
  drawLine(mouseEvent, sigCanvas, context);

  context.closePath();

  // unbind any events which could draw
  $(sigCanvas)
    .unbind('mousemove')
    .unbind('mouseup')
    .unbind('mouseout');
}

// Clear the canvas context using the canvas width and height
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function setColor(color) {
  context.strokeStyle = color;
}

function setSize(size) {
  context.lineWidth = size;
}

function exportImg() {
  /*var image = canvas
    .toDataURL('image/png')
    .replace('image/png', 'image/octet-stream'); // here is the most important part because if you dont replace you will get a DOM 18 exception.

  window.location.href = image;*/
  canvas.toBlob(function(blob) {
    document.getElementById('exampleModalLabel').innerText = 'Cargando ...';
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
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          fetch('http://172.19.0.232:5000/api', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ exp: downloadURL })
          }).then(function(response) {
            response.text().then(data => {
              evaluateAnimalResult(JSON.parse(data));
            });
          });
          console.log('File available at', downloadURL);
        });
      }
    );
  });
}
function evaluateAnimalResult(animalProbability) {
  debugger;
  var exampleModalLabel = document.getElementById('exampleModalLabel');
  var validAnimal = parseSpanish(getValidAnimal(animalProbability));

  if (validAnimal == phrases[index]) {
    exampleModalLabel.innerText = `Enhorabuena, tu dibujo se parece al animal, el siguiente es un dibujo hecho por otra persona`;
  } else {
    exampleModalLabel.innerText = `Puedes hacerlo mejor, tu dibujo es más parecido a un(a) ${validAnimal}, el siguiente es un dibujo hecho por otra persona`;
  }
}

function getValidAnimal(animalProbability) {
  var maxAnimal = '';
  var maxValue = 0;
  for (var animal in animalProbability) {
    if (animalProbability[animal] > maxValue) {
      maxValue = animalProbability[animal];
      maxAnimal = animal;
    }
  }
  return maxAnimal;
}
function parseSpanish(animal) {
  switch (animal) {
    case 'cat':
      return 'Gato';
    case 'sheep':
      return 'Oveja';
    case 'dog':
      return 'Perro';
    case 'octopus':
      return 'Pulpo';
    case 'hedgehog':
      return 'Erizo';
    case 'giraffe':
      return 'Jirafa';
    case 'bee':
      return 'Abeja';
  }
}

function goToBack() {
  window.location.href = 'http://localhost:4200/home';
}
