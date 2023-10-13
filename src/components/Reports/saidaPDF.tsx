import moment from "moment";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


export function saidasPDF(saidas: {
  _id?: string;
  destinatario?: string;
  criadoEm?: Date;
  produtos: any;
}) {

  (pdfMake as any).vfs = pdfFonts && pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : globalThis.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Registro de Saída",
      fontSize: 15,
      alignment: "center",
      bold: true,
      margin: [0, 20, 0, 35], //left, top, right, bottom
    },
  ];

  const criadoEm = moment(saidas.criadoEm);
  const formattedDate = criadoEm.format('DD/MM/YYYY - H:mm:ss');

  const reportSubTitle = [
    {
      text: `Endereçado à(o): ${saidas.destinatario}`,
      fontSize: 10,
      bold: true,
      margin: [10, 5, 0, 0], //left, top, right, bottom
    },
    {
      text: `Registro criado em: ${formattedDate}`,
      fontSize: 10,
      margin: [10, 5, 0, 10], //left, top, right, bottom
    },
  ];

  const dadosDosProdutos = saidas.produtos.map(
    (saida: {
      nome: string;
      quantidade: number;
      medida: string;
      genero: string;
    }) => {
      return [
        { text: saida.nome, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: saida.quantidade, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: saida.medida, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: saida.genero, fontSize: 9, margin: [0, 2, 0, 2] },
      ];
    }
  );

  const details = [
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "*"], //calcula automaticamente a largura de cada coluna
        body: [
          [
            { text: "Produto", style: "tableHeader", fontSize: 10 },
            { text: "Quantidade", style: "tableHeader", fontSize: 10 },
            { text: "Medida", style: "tableHeader", fontSize: 10 },
            { text: "Gênero", style: "tableHeader", fontSize: 10 },
          ],
          ...dadosDosProdutos,
        ],
      },
      alignment: "center",
      layout: "lightHorizontalLines",
    },
  ];

  function Footer(currentPage: number, pageCount: number) {
    return [
      {
        text: `ControleStock - página:   ${currentPage} /  ${pageCount}`,
        fontSize: 9,
        alignment: "right",
        margin: [0, 10, 20, 0], //left, top, right, bottom
      },
    ];
  }

  const docDefinitions: any = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: [reportSubTitle, details],
    footer: Footer,
  };

  pdfMake.createPdf(docDefinitions).download();
}
