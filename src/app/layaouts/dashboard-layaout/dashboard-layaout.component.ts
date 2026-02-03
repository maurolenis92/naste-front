import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-dashboard-layaout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ButtonComponent],
  templateUrl: './dashboard-layaout.component.html',
  styleUrl: './dashboard-layaout.component.scss',
})
export class DashboardLayaoutComponent implements OnInit {
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

  private router = inject(Router);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private modalService = inject(ModalService);
  public userData = this.userService.userData;

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe();
  }

  public openLogoutModal(): void {
    this.modalService.openGenericModal({
      title: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      confirmAction: () => this.logout(),
    });
  }

  public async logout(): Promise<void> {
    try {
      await this.authService.signOut();
      this.router.navigate(['/login']);
    } catch {
      this.router.navigate(['/login']);
    }
  }
}
