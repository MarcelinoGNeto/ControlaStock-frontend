import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Item } from "./produtosSaidaTable";

export function DetalheProduto({
  _id,
  nome,
  quantidade,
  medida,
  genero,
}: Item) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Produto</CardTitle>
        </CardHeader>
        <CardContent>
            <p>
              Nome:{" "}
              <span className="font-bold">
                {nome ? nome : ""}
              </span>
            </p>
            <p>
              Quantidade em Estoque:{" "}
              <span className="font-bold">
                {quantidade ? quantidade : ""} {medida ? medida : ""}
              </span>
            </p>

            <p>
              Gênero: <span className="font-bold">{genero ? genero : ""}</span>
            </p>
        </CardContent>
        <CardFooter>
          <p>Id: <span className="text-xs">{_id ? _id : ""}</span></p>
        </CardFooter>
      </Card>
    </>
  );
}
