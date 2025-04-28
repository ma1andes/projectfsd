from rest_framework import serializers
from .models import Posts, Comments, Likes
from user.models import CustomUser


class PostsSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=True)
    content = serializers.CharField(required=True)
    owner = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), required=True)

    class Meta:
        model = Posts
        fields = ['id', 'title', 'content', 'owner']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['owner'] = instance.owner.username
        return representation

    def create(self, validated_data):
        return Posts.objects.create(**validated_data)

class CommentsSerializer(serializers.ModelSerializer):
    content = serializers.CharField(required=True)
    owner = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), required=True)
    post = serializers.PrimaryKeyRelatedField(queryset=Posts.objects.all(), required=True)

    class Meta:
        model = Comments
        fields = ['id', 'content', 'owner', 'post', 'created_at', 'updated_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['owner'] = instance.owner.username
        return representation

class LikesSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), required=True)
    post = serializers.PrimaryKeyRelatedField(queryset=Posts.objects.all(), required=True)

    class Meta:
        model = Likes
        fields = ['id', 'owner', 'post']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['owner'] = instance.owner.username
        return representation
