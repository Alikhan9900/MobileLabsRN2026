import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

type NewsItem = {
  id: string;
  title: string;
  description: string;
};

export default function MainScreen() {
  const router = useRouter();

  const generateData = (count: number, startIndex: number = 0): NewsItem[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: String(startIndex + i),
      title: `Новина ${startIndex + i + 1}`,
      description: `Опис новини ${startIndex + i + 1}`,
    }));
  };

  const [data, setData] = useState<NewsItem[]>(generateData(10, 0));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setData(generateData(10, 0));
      setRefreshing(false);
    }, 1000);
  };

  const loadMore = () => {
    if (loadingMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      setData((prev) => {
        const startIndex = prev.length;
        const newData = generateData(5, startIndex);
        return [...prev, ...newData];
      });

      setLoadingMore(false);
    }, 500);
  };

  return (
      <FlatList
          contentContainerStyle={styles.list}
          data={data}
          keyExtractor={(item) => item.id}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={<Text style={styles.header}>Список новин</Text>}
          ListFooterComponent={
            <Text style={styles.footer}>
              {loadingMore ? 'Завантаження нових новин...' : 'Кінець поточного списку'}
            </Text>
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          initialNumToRender={6}
          maxToRenderPerBatch={5}
          windowSize={5}
          renderItem={({ item }) => (
              <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                      router.push({
                        pathname: '/news/details',
                        params: {
                          title: item.title,
                          desc: item.description,
                        },
                      })
                  }>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </TouchableOpacity>
          )}
      />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  footer: {
    marginTop: 16,
    textAlign: 'center',
    color: '#666',
  },
  separator: {
    height: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#444',
  },
});