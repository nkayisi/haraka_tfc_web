from django.forms import ModelForm

from evaluation.models import Comment



class CommentForm(ModelForm):
    class Meta:
        model = Comment
        fields = '__all__'
        exclude = ['course', 'comment_date']
