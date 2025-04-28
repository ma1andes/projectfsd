from django.shortcuts import get_object_or_404
from .models import Posts, Comments, Likes
from .serializers import PostsSerializer, CommentsSerializer, LikesSerializer

from user.permissions import IsOwner, IsAuthenticatedUser

from rest_framework.response import Response as r
from rest_framework import views
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class PostsList(views.APIView):
    permission_classes = [IsAuthenticatedUser]
    serializer_class = PostsSerializer

    @swagger_auto_schema(
        operation_description="Получить список всех постов",
        responses={
            200: openapi.Response(
                description="Список постов успешно получен",
                schema=PostsSerializer(many=True)
            ),
            400: "Ошибка при получении постов"
        }
    )
    def get(self, request, format=None):
        try:
            posts = Posts.objects.all()
            serializer = PostsSerializer(posts, many=True)
            return r(
                serializer.data,
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return r(
                {
                    "error": f"Ошибка получения постов: {str(e)}."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

class PostsDetail(views.APIView):
    permission_classes = [IsAuthenticatedUser]
    serializer_class = PostsSerializer

    @swagger_auto_schema(
        operation_description="Получить детальную информацию о посте",
        responses={
            200: openapi.Response(
                description="Пост успешно найден",
                schema=PostsSerializer
            ),
            400: "Ошибка при получении поста",
            404: "Пост не найден"
        }
    )
    def get(self, request, pk, format=None):
        try:
            post = get_object_or_404(Posts, pk=pk)
            serializer = PostsSerializer(post)
            return r(
                {
                    "data": serializer.data,
                    "message": "Пост успешно найден.",
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return r(
                {
                    "error": f"Ошибка при получении поста: {str(e)}."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

class PostUpdate(views.APIView):
    permission_classes = [IsOwner]
    serializer_class = PostsSerializer

    @swagger_auto_schema(
        operation_description="Обновить пост",
        request_body=PostsSerializer,
        responses={
            200: openapi.Response(
                description="Пост успешно обновлен",
                schema=PostsSerializer
            ),
            400: "Ошибка валидации данных",
            404: "Пост не найден"
        }
    )
    def put(self, request, pk, format=None):
        try:
            post = get_object_or_404(Posts, pk=pk)
            serializer = PostsSerializer(post, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return r(
                    {
                        "data": serializer.data,
                        "message": "Ваш пост успешно изменён.",
                    },
                    status=status.HTTP_200_OK,
                )
            return r(
                {
                    "error": "Ошибка валидации данных.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return r(
                {
                    "error": f"Ошибка при обновлении поста: {str(e)}."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

class PostsDelete(views.APIView):
    permission_classes = [IsOwner]
    serializer_class = PostsSerializer

    @swagger_auto_schema(
        operation_description="Удалить пост",
        responses={
            204: "Пост успешно удален",
            400: "Ошибка при удалении поста",
            404: "Пост не найден"
        }
    )
    def delete(self, request, pk, format=None):
        try:
            post = get_object_or_404(Posts, pk=pk)
            post.delete()
            return r(
                {
                    "message": "Ваш пост успешно удалён.",
                },
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return r(
                {
                    "error": f"Ваш пост не удалось удалить: {str(e)}."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

class PostCreate(views.APIView):
    permission_classes = [IsAuthenticatedUser]
    serializer_class = PostsSerializer

    @swagger_auto_schema(
        operation_description="Создать новый пост",
        request_body=PostsSerializer,
        responses={
            201: openapi.Response(
                description="Пост успешно создан",
                schema=PostsSerializer
            ),
            400: "Ошибка валидации данных"
        }
    )
    def post(self, request, format=None):
        serializer = PostsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return r(
                {
                    "data": serializer.data,
                    "message": "Ваш пост успешно создан!",
                },
                status=status.HTTP_201_CREATED,
            )
        return r(
            {
                "error": "Ошибка валидации данных.",
                "details": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

# Comments views
class CommentsList(views.APIView):
    permission_classes = [IsAuthenticatedUser]
    serializer_class = CommentsSerializer

    @swagger_auto_schema(
        operation_description="Получить список комментариев к посту",
        responses={
            200: openapi.Response(
                description="Список комментариев успешно получен",
                schema=CommentsSerializer(many=True)
            ),
            400: "Ошибка при получении комментариев"
        }
    )
    def get(self, request, post_id, format=None):
        try:
            comments = Comments.objects.filter(post_id=post_id)
            serializer = CommentsSerializer(comments, many=True)
            return r(
                {
                    "data": serializer.data,
                    "message": "Комментарии успешно получены.",
                    "total": len(comments),
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return r(
                {
                    "error": f"Ошибка получения комментариев: {str(e)}."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

class CommentCreate(views.APIView):
    permission_classes = [IsAuthenticatedUser]
    serializer_class = CommentsSerializer

    @swagger_auto_schema(
        operation_description="Создать новый комментарий",
        request_body=CommentsSerializer,
        responses={
            201: openapi.Response(
                description="Комментарий успешно создан",
                schema=CommentsSerializer
            ),
            400: "Ошибка валидации данных"
        }
    )
    def post(self, request, post_id, format=None):
        try:
            post = get_object_or_404(Posts, pk=post_id)
            data = request.data.copy()
            data['post'] = post.id
            data['owner'] = request.user.id
            serializer = CommentsSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return r(
                    {
                        "data": serializer.data,
                        "message": "Комментарий успешно создан!",
                    },
                    status=status.HTTP_201_CREATED,
                )
            return r(
                {
                    "error": "Ошибка валидации данных.",
                    "details": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return r(
                {
                    "error": f"Ошибка при создании комментария: {str(e)}."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

class CommentDelete(views.APIView):
    permission_classes = [IsOwner]
    serializer_class = CommentsSerializer

    @swagger_auto_schema(
        operation_description="Удалить комментарий",
        responses={
            204: "Комментарий успешно удален",
            400: "Ошибка при удалении комментария",
            404: "Комментарий не найден"
        }
    )
    def delete(self, request, comment_id, format=None):
        try:
            comment = get_object_or_404(Comments, pk=comment_id)
            comment.delete()
            return r(
                {
                    "message": "Комментарий успешно удалён.",
                },
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return r(
                {
                    "error": f"Ошибка при удалении комментария: {str(e)}."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

# Likes views
class LikeCreate(views.APIView):
    permission_classes = [IsAuthenticatedUser]
    serializer_class = LikesSerializer

    @swagger_auto_schema(
        operation_description="Поставить лайк посту",
        responses={
            201: "Лайк успешно поставлен",
            200: "Лайк уже был поставлен",
            400: "Ошибка при постановке лайка"
        }
    )
    def post(self, request, post_id, format=None):
        try:
            post = get_object_or_404(Posts, pk=post_id)
            like, created = Likes.objects.get_or_create(owner=request.user, post=post)
            if created:
                return r(
                    {
                        "message": "Лайк успешно поставлен!",
                    },
                    status=status.HTTP_201_CREATED,
                )
            return r(
                {
                    "message": "Вы уже поставили лайк этому посту.",
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return r(
                {
                    "error": f"Ошибка при постановке лайка: {str(e)}."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

class LikeDelete(views.APIView):
    permission_classes = [IsAuthenticatedUser]
    serializer_class = LikesSerializer

    @swagger_auto_schema(
        operation_description="Удалить лайк с поста",
        responses={
            204: "Лайк успешно удален",
            400: "Ошибка при удалении лайка",
            404: "Лайк не найден"
        }
    )
    def delete(self, request, post_id, format=None):
        try:
            like = get_object_or_404(Likes, owner=request.user, post_id=post_id)
            like.delete()
            return r(
                {
                    "message": "Лайк успешно удалён.",
                },
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return r(
                {
                    "error": f"Ошибка при удалении лайка: {str(e)}."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

class PostLikesCount(views.APIView):
    permission_classes = [IsAuthenticatedUser]
    
    @swagger_auto_schema(
        operation_description="Получить количество лайков поста",
        responses={
            200: openapi.Response(
                description="Количество лайков успешно получено",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'likes_count': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'message': openapi.Schema(type=openapi.TYPE_STRING)
                    }
                )
            ),
            400: "Ошибка при получении количества лайков"
        }
    )
    def get(self, request, post_id, format=None):
        try:
            likes_count = Likes.objects.filter(post_id=post_id).count()
            return r(
                {
                    "likes_count": likes_count,
                    "message": "Количество лайков успешно получено.",
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return r(
                {
                    "error": f"Ошибка при получении количества лайков: {str(e)}."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
