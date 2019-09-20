import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'autenticacao', pathMatch: 'full' },
  { path: 'login', loadChildren: './auth/auth.module#AuthModule' },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',// canLoad: [AuthGuard]
  },
  {
    path: 'autenticacao',
    loadChildren: './autenticacao/autenticacao.module#AutenticacaoPageModule',
  },
  {
    path: 'consultas',
    loadChildren: './consultas/consultas.module#ConsultasPageModule',// canLoad: [AuthGuard]
  },
  { path: 'adicionar-medicamento', loadChildren: './adicionar-medicamento/adicionar-medicamento.module#AdicionarMedicamentoPageModule' }, //,canLoad: [AuthGuard],
  { path: 'consultas', loadChildren: './consultas/consultas.module#ConsultasPageModule' }, //,canLoad: [AuthGuard]
  { path: 'seus-medicamentos', loadChildren: './seus-medicamentos/seus-medicamentos.module#SeusMedicamentosPageModule' },//,canLoad: [AuthGuard]
  { path: 'medicamentos', loadChildren: './medicamentos/medicamentos.module#MedicamentosPageModule' }, //,canLoad: [AuthGuard]
  { path: 'bulas', loadChildren: './bulas/bulas.module#BulasPageModule' }, //, canLoad: [AuthGuard]
  { path: 'nova-consulta', loadChildren: './nova-consulta/nova-consulta.module#NovaConsultaPageModule' }, //, canLoad: [AuthGuard]
  { path: 'adicionar-medico', loadChildren: './adicionar-medico/adicionar-medico.module#AdicionarMedicoPageModule' }, //, canLoad: [AuthGuard]
  { path: 'consultas-marcadas', loadChildren: './consultas-marcadas/consultas-marcadas.module#ConsultasMarcadasPageModule' }, //, canLoad: [AuthGuard]
  { path: 'login', loadChildren: './auth/pages/login/login.module#LoginPageModule' },
  { path: 'configurar-estoque', loadChildren: './configurar-estoque/configurar-estoque.module#ConfigurarEstoquePageModule' }, { path: 'autenticacao', loadChildren: './autenticacao/autenticacao.module#AutenticacaoPageModule' },
  { path: 'novo-usuario', loadChildren: './novo-usuario/novo-usuario.module#NovoUsuarioPageModule' },
  //,canLoad: [AuthGuard]
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
