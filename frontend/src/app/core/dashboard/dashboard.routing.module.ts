import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard.page';
import { ProfilePage } from './pages/profile/profile.page';
import { AdminsPage } from './pages/admins/admins.page';
import { RequestsPage } from './pages/requests/requests.page';
import { BlogPostsPage } from './pages/blogs-posts/blog-posts.page';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/admins', pathMatch: 'full' },
  {
    path: '',
    component: DashboardPage,
    children: [
      { path: 'profile', component: ProfilePage },
      { path: 'admins', component: AdminsPage },
      { path: 'requests', component: RequestsPage },
      { path: 'blog-posts', component: BlogPostsPage },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
