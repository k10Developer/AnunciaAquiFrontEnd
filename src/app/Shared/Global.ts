import { HttpHeaders } from '@angular/common/http';
import { DeaultClass } from '../_models/defaultClass';

export class Global {
    public static BASE_USER_ENDPOINT = 'https://localhost:5001/api/';

    public static GetCurrentUser():any{
        return JSON.parse(localStorage.getItem('user'));
    }

    public static GetCor(): Array<DeaultClass> {
        const cor: DeaultClass[] = new Array<DeaultClass>();
        cor.push({id: 1, descricao: 'Branco'});
        cor.push({id: 2, descricao: 'Azul'});
        cor.push({id: 3, descricao: 'Vermelho'});
        cor.push({id: 4, descricao: 'Verde'});
        cor.push({id: 5, descricao: 'Rosa'});
        cor.push({id: 6, descricao: 'Amarelo'});
        return cor;
      }
      public static GetTipoCombustivel(): Array<DeaultClass> {
        const tipoCombustivel: DeaultClass[] = new Array<DeaultClass>();
        tipoCombustivel.push({id: 1, descricao: 'Gasolina'});
        tipoCombustivel.push({id: 2, descricao: 'Etanol'});
        tipoCombustivel.push({id: 3, descricao: 'Flex'});
        tipoCombustivel.push({id: 4, descricao: 'CNV'});
        tipoCombustivel.push({id: 5, descricao: 'Diesel'});
        return tipoCombustivel;
      }
}