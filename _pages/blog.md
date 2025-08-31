---
layout: default
title: "Blog"
permalink: blog
---

<section>
    <div class="container-fluid">
        <div class="p-1 pt-4 p-sm-4 pt-md-0">
            <div class="row d-flex align-items-strech flex-wrap">
                {% for post in site.posts %}
                    <div class="col-lg-4 col-md-6 mb-5">
                        <a href="{{ post.url | relative_url }}" class="text-decoration-none text-primary d-flex flex-column">
                            <div>
                                <div class="position-relative">
                                    {% if post.image %}
                                        <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" class="preview-img w-100 z-0">
                                    {% endif %}
                                    <div class="start-0 bottom-0 p-2 position-absolute z-1">
                                        {% for category in post.categories %}
                                            <span class="badge bg-light text-primary fw-regular fw-normal fs-6">{{ category }}</span>{% if forloop.last == false %} {% endif %}
                                        {% endfor %}
                                    </div>
                                </div>
                                <div class="ps-2 pe-3">
                                    <span class="mt-4 d-block">{{ post.date | date: "%d.%m.%Y" }}</span>
                                    <h3 class="fs-4 fw-bold">{{ post.title }}</h3>
                                    <p class="text-dark">{{ post.excerpt }}</p>
                                </div>
                            </div>
                            <span class="text-decoration-underline ps-2 pe-3">Weiterlesen</span>
                        </a>
                    </div>
                {% endfor %}
            </div>
        </div>
    </div>
</section>