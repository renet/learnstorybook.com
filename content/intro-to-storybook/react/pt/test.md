---
title: 'Teste de componentes de interface de utilizador'
tocTitle: 'Testes'
description: 'Aprendizagem das formas de teste dos componentes interface utilizador'
commit: '3e283f7'
---

Qualquer tutorial de Storybook não estaria completo sem serem mencionados os testes. Estes são essenciais na criação de interfaces de utilizador de alta qualidade. Nos sistemas modulares, ajustes minúsculos poderão levar a regressões gigantescas. Até agora foram descritos três tipos de testes:

- **Testes visuais** dependem do programador para olhar para o componente manualmente e verificar se está tudo de acordo. Ajudam a manter um nível de coerência em termos de aparência á medida que é construído.
- **Testes snapshot** com o extra Storyshots é capturado o markup renderizado do componente. Ajudam a ficar a par das alterações no markup que causam erros de renderização e avisos.
- **Unit tests** com Jest é verificado que o output de um determinado componente mantém-se idêntico dado um input fixo. São ótimos para efetuar testes das qualidades funcionais de um componente.

## "Mas aparenta ser correto"?

Infelizmente as metodologias de teste acima mencionadas, sozinhas não são suficientes para prevenir problemas no interface de utilizador. Estes são complicados para testar, visto que o design é algo subjetivo e com nuances. Os testes visuais são demasiado manuais, os testes de snapshot poderão originar demasiados falsos positivos quando usados para interface de utilizador e os testes unitários ao nível de pixel são pobres. Uma estratégia de testes considerada completa para o Storybook incluí também testes visuais de regressão.

## Testes visuais de regressão para o Storybook

Os testes visuais de regressão são desenhados para capturar alterações de aparência. Trabalham com capturas de cada estória e são depois comparadas commit a commit contra as alterações. Isto é perfeito para verificar elementos gráficos, tais como o layout, cor, tamanho e contraste.

<video autoPlay muted playsInline loop style="width:480px; margin: 0 auto;">
  <source
    src="/intro-to-storybook/visual-regression-testing.mp4"
    type="video/mp4"
  />
</video>

O Storybook é uma ferramenta fantástica para este tipo de testes, por que cada estória é na sua essência uma especificação de teste. Cada vez que é escrita ou atualizada uma estória, obtemos uma especificação de graça!

Existem inúmeras ferramentas para este propósito. Para equipas profissionais é recomendado o [**Chromatic**](https://www.chromatic.com/), um extra desenvolvido pela equipa de manutenção do Storybook que efetua testes na núvem.

## Configuração de testes de regressão visual

O Chromatic é um extra sem complicações para este tipo de testes. Visto que é um serviço pago (mas com o período de testes grátis), logo poderá não ser para toda a gente. No entanto este é um exemplo de uma ferramenta ao nível profissional que irá usada gratuitamente.
Em seguida vai ser elaborada uma breve introdução desta.

## Atualizar o git

Quando o projeto foi inicializado, o Create React App criou um repositório local. Vamos adicionar as alterações efetuadas:

```bash
$ git add -A
```

É feito o commit dos ficheiros.

```bash
$ git commit -m "taskbox UI"
```

### Obter o Chromatic

Adiciona-se o pacote como dependência.

```bash
yarn add -D chromatic
```

Um aspeto fantástico acerca deste extra é que recorre á Git history para se manter a par dos componentes de interface de utilizador.

Faça a [autenticação na plataforma Chromatic](https://www.chromatic.com/start), com a conta GitHub (O Chromatic pede permissões ligeiras). Em seguida crie um projeto com o nome "taskbox" e copie e guarde seu o `project-token` único.

<video autoPlay muted playsInline loop style="width:520px; margin: 0 auto;">
  <source
    src="/intro-to-storybook/chromatic-setup-learnstorybook.mp4"
    type="video/mp4"
  />
</video>

Execute o comando de testes na consola de forma a configurar os testes visuais de regressão para o Storybook. Não esquecer de adicionar o `project-token` fornecido ao invés de `<project-token>`.

```bash
npx chromatic --project-token=<project-token>
```

<div class="aside"> Se o seu Storybook tiver um script de compilação personalizado, poderá ter que <a href="https://www.chromatic.com/docs/setup#command-options">adicionar opções</a> a este comando. </div>

Assim que o primeiro teste estiver concluído, é obtida a base de testes para cada estória. Por outras palavras, uma captura de cada estória considerada "boa". Alterações futuras a estas estórias, irão ser comparadas com esta base.

![Bases Chromatic](/intro-to-storybook/chromatic-baselines.png)

## Captura de uma alteração no interface utilizador

Os testes de regressão visual dependem da comparação de imagens do novo código do interface de utilizador que foi agora renderizado com as imagens de base. Se for capturada uma alteração no interface de utilizador irá surgir uma notificação. Para isto ser observado altera-se o fundo do componente `Task`:

![alteração código](/intro-to-storybook/chromatic-change-to-task-component.png)

O que irá gerar uma nova cor de fundo para o item.

![Alteração do fundo da tarefa](/intro-to-storybook/chromatic-task-change.png)

Usando agora o comando de testes, para efectuar um outro teste com o Chromatic.

```bash
npx chromatic --project-token=<project-token>
```

Ao abrir-se o link, irão ser apresentadas a alterações.

![Alterações interface utilizador no Chromatic](/intro-to-storybook/chromatic-catch-changes.png)

Pode constatar-se um grande número de alterações! Significa que uma alteração pequena irá originar uma regressão enorme, isto na hierarquia de componentes cuja `Task` é filha de `TaskList` e `Inbox`.
É precisamente por esta circunstância que os programadores necessitam de testes visuais de regressão além de outras metodologias de teste.

![Regressoes grandes com alterações de interface de utilizador pequenas](/intro-to-storybook/minor-major-regressions.gif)

## Revisão de alterações

Os testes de regressão visual garantem que os componentes não se alteram por acidente. Mas cabe ao programador determinar quais as alterações intencionais e as que não o são.

Se uma alteração é intencional, é necessária a atualização da linha de base de forma que os testes futuros sejam comparados com a versão da estória mais recente. Se não o é, é necessário corrigir.

<video autoPlay muted playsInline loop style="width:480px; margin: 0 auto;">
  <source
    src="/intro-to-storybook/website-workflow-review-merge-optimized.mp4"
    type="video/mp4"
  />
</video>

Visto que as aplicações modernas são construidas a partir de componentes, é importante testar ao nível destes. Ao efetuar-se isto ajuda a identificar a principal causa da alteração, ou seja o componente, ao invés de reagir aos sintomas de uma alteração, ecrãs ou componentes compostos.

## Fusão de alterações

Assim que for terminada a revisão, será possível fundir as alterações com confiança, sabendo que as atualizações não introduzem acidentalmente problemas ou erros. Se o novo fundo `red` for aceitável, terão que ser aceites as alterações, caso contrário, será necessário reverter para o estado anterior.

![Alterações prontas para serem fundidas](/intro-to-storybook/chromatic-review-finished.png)

O Storybook ajuda na **construção** de componentes; os testes ajudam na sua **manutenção**. Os quatro tipos de teste abordados neste tutorial são, visuais, snapshot,unitários e regressão visual. Os últimos três podem ser automatizados através da adição destes ao script de IC (integração continua, CI na forma nativa). Isto ajuda na implementação de componentes sem ser necessária a preocupação com problemas errantes que possam surgir. O fluxo completo é ilustrado abaixo.

![Fluxo de testes de regressão visual](/intro-to-storybook/cdd-review-workflow.png)
