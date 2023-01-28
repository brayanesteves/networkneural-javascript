let i;
let tbody          = document.getElementById('results');
let bias           = document.getElementById('bias');
let tbody_inputs   = document.getElementById('inputs');
let tbody_input    = document.getElementById('input-show');
let tbody_train    = document.getElementById('train');
let tbody_inputs_i = document.getElementsByClassName('inputs');
let row;
let row_inputs;
let row_input;
let row_train;
/**
 * Learning neural netwotk
 * Neural network 2 inputs
 * Port logical AND
 * (input) 0 0 = (output) 0
 * (input) 0 1 = (output) 0
 * (input) 1 0 = (output) 0
 * (input) 1 1 = (output) 1
 */
let input  = [[0, 0], [0, 1], [1, 0], [1, 1]];
let output = [0, 0, 0, 1];
let neuron = {
    weights:   [],
      bias: null,
      learningRatio:0.001,
      init: function(numberWeights) {
        for(let i = 0; i < numberWeights; i++) {
            this.weights[i] = Math.random() * (0.5 + 0.5) - 0.5;
        }
        this.bias = Math.random() * (0.5 + 0.5) - 0.5;
      },
    input(input) {
        let inputs = 0;
        for(let i = 0; i < input.length; i++) {
            inputs += this.weights[i] * input[i];
        }
        inputs += this.bias;
        if(inputs < 1){
            inputs = 0;
        } else  {
            inputs = 1;
        }
        return inputs;
    },
    train(epochs, dataInput, dataOutput) {
        for(let i = 0; i < epochs; i++) {
            let errorEpoch = 0;
            for(let j = 0; j < dataInput.length; j++) {
                let currentInput  = dataInput[j];
                let currentOutput = dataOutput[j];
                let input         = this.input(currentInput);
                let error         = currentOutput - input;
                errorEpoch       += Math.abs(error);
                this.adjustWeights(error, currentInput);
            }
            row_train                        = tbody_train.insertRow();
            row_train.insertCell().innerHTML = i;
            row_train.insertCell().innerHTML = errorEpoch / dataInput.length;
            console.log(errorEpoch / dataInput.length)
        }
    },
    adjustWeights(error, currentInput) {
        for(let i = 0; i < this.weights.length; i++) {
            let adjust       = error * this.learningRatio * currentInput[i];
            this.weights[i] += adjust;
        }
        let adjust = error * this.learningRatio * 1;
        this.bias += adjust; 
    }
};
/**
 * ¿Why 2? Exist 2 input
 * input  = [[0, 0], [0, 1], [1, 0], [1, 1]];
 * [input 1, input 2]
 */
neuron.init(2);
neuron.train(500, input, output);

bias.innerHTML = neuron.bias;
for(i = 0; i < neuron.weights.length; i++) {
    row                        = tbody.insertRow();
    row.insertCell().innerHTML = i;
    row.insertCell().innerHTML = neuron.weights[i];
}

for(i = 0; i < input.length; i++) {
    let cell1, cell2, cell3, cell4;
    row_inputs                        = tbody_inputs.insertRow();
    cell1 = row_inputs.insertCell(0);
    cell2 = row_inputs.insertCell(1);
    cell3 = row_inputs.insertCell(2);
    cell4 = row_inputs.insertCell(3);
    cell1.innerHTML = i;
    cell2.innerHTML = input[i];    
    cell3.innerHTML = neuron.input(input[i]);
    cell4.innerHTML = output[i];

    cell3.className = `input-show-${i}`;    
}

row_input                        = tbody_input.insertRow();
row_input.insertCell().innerHTML = neuron.input([1, 0]);