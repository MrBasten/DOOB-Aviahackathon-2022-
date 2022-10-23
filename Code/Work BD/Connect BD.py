import pandas as pd
import csv
import sys
from heapq import heappop, heappush

info_about_Distance = pd.read_csv('/content/Distance.csv')
info_about_Plane = pd.read_csv('/content/Plane.csv')
info_about_poin_location = pd.read_csv('/content/poin-location.csv')


# Класс для хранения узла кучи
class Node:
    def __init__(self, vertex, weight=0):
        self.vertex = vertex
        self.weight = weight

    # Переопределите функцию __lt__(), чтобы класс `Node` работал с минимальной кучей.
    def __lt__(self, other):
        return self.weight < other.weight


# Класс для представления graphического объекта
class Graph:
    def __init__(self, edges, n):
        # выделяет память для списка смежности
        self.adjList = [[] for _ in range(n)]

        # добавляет ребра в ориентированный graph
        for (source, dest, weight) in edges:
            self.adjList[source].append((dest, weight))


def get_route(prev, i, route):
    if i >= 0:
        get_route(prev, prev[i], route)
        route.append(i)


fout = open('output.txt', 'w')
# Запустить алгоритм Дейкстры на заданном Graph


def findShortestPaths(graph, source, n):

    # создает минимальную кучу и проталкивает исходный узел с расстоянием 0
    pq = []
    heappush(pq, Node(source))

    # устанавливает начальное расстояние от источника на `v` как бесконечность
    dist = [sys.maxsize] * n

    # расстояние от источника до себя равно нулю
    dist[source] = 0

    # Список # для отслеживания вершин, для которых уже найдена минимальная стоимость
    done = [False] * n
    done[source] = True

    # хранит предшественника вершины (до пути печати)
    prev = [-1] * n

    # работает до тех пор, пока мини-куча не станет пустой
    while pq:

        node = heappop(pq)      # Удалить и вернуть лучшую вершину
        u = node.vertex         # получить номер вершины

        # сделать для каждого соседа `v` из `u`
        for (v, weight) in graph.adjList[u]:
            if not done[v] and (dist[u] + weight) < dist[v]:        # Шаг релаксации
                dist[v] = dist[u] + weight
                prev[v] = u
                heappush(pq, Node(v, dist[v]))

        # пометить вершину `u` как выполненную, чтобы она больше не поднималась
        done[u] = True

    route = []
    for i in range(n):
        if i != source and dist[i] != sys.maxsize:
            get_route(prev, i, route)
            print(f'{source}:{i}/{dist[i]}/{route}', file=fout)
            route.clear()


if __name__ == '__main__':
   # общее количество узлов в Graph (от 0 до 4)
    n = len(info_about_Distance)
    m = 10000

    # инициализирует ребра в соответствии с приведенной выше схемой.
    # (u, v, w) представляет ребро из вершины `u` в вершину `v`, имеющее вес `w`
    edges = [0] * n
    for i in range(0, n):
        s_p = (
            info_about_Distance['source_point_id'].loc[info_about_Distance.index[i]])
        t_p = (
            info_about_Distance['target_point_id'].loc[info_about_Distance.index[i]])
        dis = (
            info_about_Distance['distance'].loc[info_about_Distance.index[i]])
        k = (s_p, t_p, dis)
        edges[i] = k

    # Graph построения
    graph = Graph(edges, m)

    # запускает алгоритм Дейкстры на каждом узле
    for source in range(m):
        findShortestPaths(graph, source, m)

fout.close()

with open('output.txt', 'r') as in_file:
    stripped = (line.strip() for line in in_file)
    lines = (line.split("/") for line in stripped if line)
    with open('Final.csv', 'w') as out_file:
        writer = csv.writer(out_file)
        writer.writerow(('Way', 'Length', 'Path'))
        writer.writerows(lines)
