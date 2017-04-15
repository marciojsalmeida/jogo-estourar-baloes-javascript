var timerId = null; // variavel que armazena a chamada da função Timeout

function iniciaJogo(){
	var url = window.location.search;
	var nivelJogo = url.replace("?", "");
	
	var tempoSegundos = 0;

	if(nivelJogo == 1){ //facil -> 120 segundos
		tempoSegundos = 120;
	}

	if(nivelJogo == 2){ //normal -> 60 segundos
		tempoSegundos = 60;
	}

	if(nivelJogo == 3){ //dificil -> 30 segundoss
		tempoSegundos = 30;
	}
	
	//inserindo os segundos no cronometro
	document.getElementById('cronometro').innerHTML = tempoSegundos;

	var qtdeBaloes = 80;

	criaBaloes(qtdeBaloes);

	//imprimir balões inteiros
	document.getElementById('baloesInteiros').innerHTML = qtdeBaloes;
	//imprimir balões estourados
	document.getElementById('baloesEstourados').innerHTML = 0;

	contagemTempo(tempoSegundos + 1);
	
}

function contagemTempo(segundos){
	segundos = segundos - 1;
	if(segundos == -1){
		clearTimeout(timerId); // para a execução da função setTimeout
		gameOver();
		return false;
	}
	document.getElementById('cronometro').innerHTML = segundos;	
	timerId = setTimeout("contagemTempo("+segundos+")", 1000);

}

function gameOver(){
	alert('Fim de jogo, você não conseguir estourar todos os balões a tempo!');
}

function criaBaloes(qtde_baloes){
	for(var i = 1; i <= qtde_baloes; i++){
		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id='b' + i; 
		balao.onclick = function(){estourar(this)}

		document.getElementById('cenario').appendChild(balao)
	}
}

function estourar(e){
	var idBalao = e.id;
	document.getElementById(idBalao).setAttribute("onclick", "");
	document.getElementById(idBalao).src='imagens/balao_azul_pequeno_estourado.png';
	pontuacao(-1)
}

function pontuacao(acao){
	var baloes_inteiros = document.getElementById('baloesInteiros').innerHTML;
	var baloes_estourados =document.getElementById('baloesEstourados').innerHTML;
	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloesInteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloesEstourados').innerHTML = baloes_estourados;

	situacaoJogo(baloes_inteiros, baloes_estourados);


}

function situacaoJogo(inteiros){
	if(inteiros == 0){
		alert('Parabens Você conseguiu estourar todos os balões a Tempo !!');
		pararJogo();
	}
}

function pararJogo(){
	clearTimeout(timerId);
}