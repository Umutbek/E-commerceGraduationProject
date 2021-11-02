# Generated by Django 3.2.6 on 2021-11-02 14:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('item', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ItemWithQuantity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('total', models.IntegerField(default=0)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='item.item')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-id',),
            },
        ),
        migrations.CreateModel(
            name='ModelCart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('check', models.IntegerField(null=True)),
                ('date', models.DateTimeField(auto_now_add=True, null=True)),
                ('clientid', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='usercart', to=settings.AUTH_USER_MODEL)),
                ('listitem', models.ManyToManyField(to='item.ItemWithQuantity')),
                ('storeid', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='storeidforcard', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]