from rest_framework import serializers
from .models import CustomUser, Posts

class CustomUserForm(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

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
