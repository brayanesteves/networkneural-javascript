/**
 * Table logic 'OR'
 * 0 or 0 = 0
 * 0 or 1 = 1
 * 1 or 0 = 1
 * 1 or 1 = 1
 */
// Input
let xs = [
    [0, 0], [0, 1], [1, 0], [1, 1]
];
// Output expect
let ys = [
    [0], [1], [1], [1]
];

let inputs  = tf.tensor2d(xs);
let outputs = tf.tensor2d(ys);

async function createModel() {
    const model  = tf.sequential();
    const hidden = tf.layers.dense({
        // Quantity of neurons
        units: 10,
        // Input number that will receive the neuron
        inputShape: [2],
        activation: 'tanh'
    });

    model.add(hidden);

    const output = tf.layers.dense({
        // Quantity of neurons
        units: 1,
        // Input number that will receive the neuron
        inputShape: [10],
        activation: 'tanh'
    });

    model.add(output);

    model.compile({
        optimizer:'sgd',
        loss: 'meanSquaredError'
    });

    const configTrain = {
        epochs:500,
    };

    const h = await model.fit(inputs, outputs, configTrain);

    console.log(h);
    console.info("Get last error model")
    console.log(h.history.loss[h.history.loss.length - 1]);

    let predict = model.predict(tf.tensor2d(xs));

    predict.print();
    outputs.print();
}

createModel();