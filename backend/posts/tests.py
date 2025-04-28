from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Posts, Comments, Likes

User = get_user_model()

class PostsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)
        
        self.post_data = {
            'title': 'Test Post',
            'content': 'Test Content',
            'owner': self.user.id
        }

    def test_create_post(self):
        url = reverse('posts:post-create')
        response = self.client.post(url, self.post_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Posts.objects.count(), 1)
        self.assertEqual(Posts.objects.get().title, 'Test Post')

    def test_get_posts_list(self):
        Posts.objects.create(
            title='Test Post',
            content='Test Content',
            owner=self.user
        )
        url = reverse('posts:posts-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_post_detail(self):
        post = Posts.objects.create(
            title='Test Post',
            content='Test Content',
            owner=self.user
        )
        url = reverse('posts:posts-detail', args=[post.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['title'], 'Test Post')

    def test_update_post(self):
        post = Posts.objects.create(
            title='Test Post',
            content='Test Content',
            owner=self.user
        )
        url = reverse('posts:post-update', args=[post.id])
        updated_data = {
            'title': 'Updated Post',
            'content': 'Updated Content'
        }
        response = self.client.put(url, updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        post.refresh_from_db()
        self.assertEqual(post.title, 'Updated Post')

    def test_delete_post(self):
        post = Posts.objects.create(
            title='Test Post',
            content='Test Content',
            owner=self.user
        )
        url = reverse('posts:posts-delete', args=[post.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Posts.objects.count(), 0)

class CommentsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)
        
        self.post = Posts.objects.create(
            title='Test Post',
            content='Test Content',
            owner=self.user
        )
        
        self.comment_data = {
            'content': 'Test Comment',
            'post': self.post.id
        }

    def test_create_comment(self):
        url = reverse('posts:comment-create', args=[self.post.id])
        response = self.client.post(url, {'content': 'Test Comment'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comments.objects.count(), 1)
        self.assertEqual(Comments.objects.get().content, 'Test Comment')

    def test_get_comments_list(self):
        Comments.objects.create(
            content='Test Comment',
            owner=self.user,
            post=self.post
        )
        url = reverse('posts:comments-list', args=[self.post.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['data']), 1)

    def test_delete_comment(self):
        comment = Comments.objects.create(
            content='Test Comment',
            owner=self.user,
            post=self.post
        )
        url = reverse('posts:comment-delete', args=[comment.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Comments.objects.count(), 0)

class LikesTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)
        
        self.post = Posts.objects.create(
            title='Test Post',
            content='Test Content',
            owner=self.user
        )

    def test_create_like(self):
        url = reverse('posts:like-create', args=[self.post.id])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Likes.objects.count(), 1)

    def test_delete_like(self):
        Likes.objects.create(
            owner=self.user,
            post=self.post
        )
        url = reverse('posts:like-delete', args=[self.post.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Likes.objects.count(), 0)

    def test_get_likes_count(self):
        Likes.objects.create(
            owner=self.user,
            post=self.post
        )
        url = reverse('posts:post-likes-count', args=[self.post.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['likes_count'], 1)

    def test_duplicate_like(self):
        url = reverse('posts:like-create', args=[self.post.id])
        self.client.post(url)
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Likes.objects.count(), 1)
