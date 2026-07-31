console.log("=======================================Bhaskara=======================================");
function calcularBhaskara(a, b, c) {
    let delta = b * b - 4 * a * c;
    if (delta < 0) {
        console.log("Não existem raízes reais.");
    } else if (delta === 0) {
        let x1 = -b / (2 * a);
        let x1_arredondado = x1.toFixed(2);
        console.log("Existe uma raiz real: x1 = " + x1_arredondado);
    } else { let x1 = (-b + Math.sqrt(delta)) / (2 * a);
        let x2 = (-b - Math.sqrt(delta)) / (2 * a);
        let x1_arredondado = x1.toFixed(2);
        let x2_arredondado = x2.toFixed(2);
        console.log("Existem duas raízes reais: x1 = " + x1_arredondado + " e x2 = " + x2_arredondado);
 }
}
let a = prompt("Digite o valor de a:");
let b = prompt("Digite o valor de b:");
let c = prompt("Digite o valor de c:");
calcularBhaskara(parseFloat(a), parseFloat(b), parseFloat(c));