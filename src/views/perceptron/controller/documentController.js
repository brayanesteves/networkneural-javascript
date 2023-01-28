class documentController {
    dni_validate(dni) {
        let number;
        let char;
        let chain;
        let successful = false;
        let expression = /^\d{8}[a-zA-Z]$/;

        if(expression.test(dni) === true) {
            number = dni.substr(0, dni.length - 1);
            char   = dni.substr(dni.length - 1, 1);
            number = number % 23;
        }
    }
}