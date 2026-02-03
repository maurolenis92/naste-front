import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layaout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './dashboard-layaout.component.html',
  styleUrl: './dashboard-layaout.component.scss',
})
export class DashboardLayaoutComponent {
  public items = [
    { label: 'Dashboard', icon: 'dashboard', route: '', active: true },
    {
      label: 'Facturas',
      icon: 'account_balance_wallet',
      route: '/invoices',
      active: false,
    },
    { label: 'Productos', icon: 'category', route: '/products', active: false },
    // { label: 'Transacciones', icon: 'swap_horiz', route: '/transactions', active: false },
    // { label: 'Reportes', icon: 'bar_chart', route: '/reports', active: false },
    // { label: 'Configuración', icon: 'settings', route: '/settings', active: false },
  ];
}
