# Generated by Django 3.2.6 on 2021-11-30 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('item', '0009_auto_20211130_1309'),
    ]

    operations = [
        migrations.CreateModel(
            name='IpModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ip', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name': 'User IP address',
                'verbose_name_plural': 'User IP addresses',
            },
        ),
        migrations.AddField(
            model_name='item',
            name='item_views',
            field=models.ManyToManyField(blank=True, related_name='post_views', to='item.IpModel'),
        ),
    ]
