import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'autenticacao', pathMatch: 'full' },
  { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'autenticacao', loadChildren: './autenticacao/autenticacao.module#AutenticacaoPageModule' },
  { path: 'adicionar-medicamento', loadChildren: './adicionar-medicamento/adicionar-medicamento.module#AdicionarMedicamentoPageModule', canActivate: [AuthGuard]  },
  { path: 'consultas', loadChildren: './consultas/consultas.module#ConsultasPageModule' , canActivate: [AuthGuard]}, 
  { path: 'seus-medicamentos', loadChildren: './seus-medicamentos/seus-medicamentos.module#SeusMedicamentosPageModule', canActivate: [AuthGuard]  },
  { path: 'bulas', loadChildren: './bulas/bulas.module#BulasPageModule', canActivate: [AuthGuard] },
  { path: 'nova-consulta', loadChildren: './nova-consulta/nova-consulta.module#NovaConsultaPageModule', canActivate: [AuthGuard]  },
  { path: 'adicionar-medico', loadChildren: './adicionar-medico/adicionar-medico.module#AdicionarMedicoPageModule' , canActivate: [AuthGuard] }, 
  { path: 'consultas-marcadas', loadChildren: './consultas-marcadas/consultas-marcadas.module#ConsultasMarcadasPageModule' , canActivate: [AuthGuard] }, 
  { path: 'novo-usuario', loadChildren: './novo-usuario/novo-usuario.module#NovoUsuarioPageModule' },
  { path: 'configuracoes', loadChildren: './configuracoes/configuracoes.module#ConfiguracoesPageModule', canActivate: [AuthGuard] },
//   { path: 'visualizar-notificacoes-pendentes', loadChildren: './visualizar-notificacoes-pendentes/visualizar-notificacoes-pendentes.module#VisualizarNotificacoesPendentesPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
