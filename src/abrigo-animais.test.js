class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1Str, brinquedosPessoa2Str, ordemAnimaisStr) {
    const animaisData = {
      Rex: { tipo: 'cao', brinquedos: ['RATO', 'BOLA'] },
      Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      Bola: { tipo: 'cao', brinquedos: ['CAIXA', 'NOVELO'] },
      Bebe: { tipo: 'cao', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] },
    };

    const brinquedosInvalidos = ['CAIXA', 'NOVELO', 'SKATE', 'LASER', 'BOLA', 'RATO'];
    const brinquedosPessoa1 = brinquedosPessoa1Str.split(',');
    const brinquedosPessoa2 = brinquedosPessoa2Str.split(',');
    const ordemAnimais = ordemAnimaisStr.split(',');

    const validarEntrada = (lista) => {
      const brinquedosUnicos = new Set(lista);
      if (brinquedosUnicos.size !== lista.length) {
        return 'Brinquedo inválido';
      }
      for (const brinquedo of lista) {
        if (!brinquedosInvalidos.includes(brinquedo)) {
          return 'Brinquedo inválido';
        }
      }
      return null;
    };

    const erroBrinquedo1 = validarEntrada(brinquedosPessoa1);
    if (erroBrinquedo1) return { erro: erroBrinquedo1 };

    const erroBrinquedo2 = validarEntrada(brinquedosPessoa2);
    if (erroBrinquedo2) return { erro: erroBrinquedo2 };

    const listaAnimaisUnicos = new Set(ordemAnimais);
    if (listaAnimaisUnicos.size !== ordemAnimais.length) {
      return { erro: 'Animal inválido' };
    }

    const animaisEncontrados = {};
    let animaisPessoa1 = 0;
    let animaisPessoa2 = 0;

    const podeAdotar = (brinquedosPessoa, brinquedosAnimal) => {
      let indexBrinquedoPessoa = 0;
      let indexBrinquedoAnimal = 0;

      while (indexBrinquedoPessoa < brinquedosPessoa.length && indexBrinquedoAnimal < brinquedosAnimal.length) {
        if (brinquedosPessoa[indexBrinquedoPessoa] === brinquedosAnimal[indexBrinquedoAnimal]) {
          indexBrinquedoAnimal++;
        }
        indexBrinquedoPessoa++;
      }
      return indexBrinquedoAnimal === brinquedosAnimal.length;
    };

    for (const animalNome of ordemAnimais) {
      if (!animaisData[animalNome]) {
        return { erro: 'Animal inválido' };
      }

      const animal = animaisData[animalNome];
      let pessoa1Apta = false;
      let pessoa2Apta = false;

      if (animal.tipo === 'gato') {
        const brinquedosSet1 = new Set(brinquedosPessoa1);
        const brinquedosSet2 = new Set(brinquedosPessoa2);
        const brinquedosGatoSet = new Set(animal.brinquedos);

        if (brinquedosSet1.size === brinquedosGatoSet.size && [...brinquedosSet1].every(b => brinquedosGatoSet.has(b))) {
          pessoa1Apta = true;
        }

        if (brinquedosSet2.size === brinquedosGatoSet.size && [...brinquedosSet2].every(b => brinquedosGatoSet.has(b))) {
          pessoa2Apta = true;
        }

      } else if (animal.tipo === 'jabuti') {
        const temBrinquedos1 = animal.brinquedos.every(b => brinquedosPessoa1.includes(b));
        const temOutroAnimal1 = (animaisPessoa1 > 0) || (animaisPessoa2 > 0);
        pessoa1Apta = temBrinquedos1 && temOutroAnimal1;
        
        const temBrinquedos2 = animal.brinquedos.every(b => brinquedosPessoa2.includes(b));
        const temOutroAnimal2 = (animaisPessoa1 > 0) || (animaisPessoa2 > 0);
        pessoa2Apta = temBrinquedos2 && temOutroAnimal2;
        
      } else { // Cão
        pessoa1Apta = podeAdotar(brinquedosPessoa1, animal.brinquedos);
        pessoa2Apta = podeAdotar(brinquedosPessoa2, animal.brinquedos);
      }
      
      let resultado = `${animalNome} - abrigo`;

      if (pessoa1Apta && pessoa2Apta) {
        resultado = `${animalNome} - abrigo`;
      } else if (pessoa1Apta && animaisPessoa1 < 3) {
        resultado = `${animalNome} - pessoa 1`;
        animaisPessoa1++;
      } else if (pessoa2Apta && animaisPessoa2 < 3) {
        resultado = `${animalNome} - pessoa 2`;
        animaisPessoa2++;
      }

      animaisEncontrados[animalNome] = resultado;
    }

    const listaOrdenada = Object.values(animaisEncontrados).sort((a, b) => {
      const nomeA = a.split(' - ')[0];
      const nomeB = b.split(' - ')[0];
      return nomeA.localeCompare(nomeB);
    });

    return { lista: listaOrdenada };
  }
}

export { AbrigoAnimais as AbrigoAnimais };