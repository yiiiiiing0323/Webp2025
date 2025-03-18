from django.urls import path
from . import views


urlpatterns = [
    #path('',views.HelloApiView.as_view(),name='index'),
    #path('',views.myhello_api,name='index'),
    # path('add', views.add_post, name='add_post'),
    # path('list', views.list_post, name='list_post')
    path('addcourse', views.add_course, name='add_course'),
    path('courselist', views.list_course, name='list_course')
]