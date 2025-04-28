from django.urls import path

from .views import (
    PostsList, PostCreate, PostUpdate, PostsDelete, PostsDetail,
    CommentsList, CommentCreate, CommentDelete,
    LikeCreate, LikeDelete, PostLikesCount
)

app_name = 'posts'

urlpatterns = [
    # Posts URLs
    path('', PostsList.as_view(), name='posts-list'),
    path('create/', PostCreate.as_view(), name='post-create'),
    path('<int:pk>/update/', PostUpdate.as_view(), name='post-update'),
    path('<int:pk>/delete/', PostsDelete.as_view(), name='posts-delete'),
    path('<int:pk>/detail/', PostsDetail.as_view(), name='posts-detail'),
    
    # Comments URLs
    path('<int:post_id>/comments/', CommentsList.as_view(), name='comments-list'),
    path('<int:post_id>/comments/create/', CommentCreate.as_view(), name='comment-create'),
    path('comments/<int:comment_id>/delete/', CommentDelete.as_view(), name='comment-delete'),
    
    # Likes URLs
    path('<int:post_id>/like/', LikeCreate.as_view(), name='like-create'),
    path('<int:post_id>/unlike/', LikeDelete.as_view(), name='like-delete'),
    path('<int:post_id>/likes/count/', PostLikesCount.as_view(), name='post-likes-count'),
]